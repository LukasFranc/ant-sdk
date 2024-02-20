require('es6-promise').polyfill();

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins({pattern: '*'});
var terser = require('gulp-terser');

const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {

            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;

        }
        else {

            // argument name
            curOpt = opt;
            arg[curOpt] = true;

        }

    }

    return arg;

})(process.argv);

function watchErrors () {
    return $.plumber(function (err) {
        $.util.beep();
        $.util.log($.util.colors.red(err));
        this.emit('end');
    })
}

gulp.task('build:less', function () {
    const developer = arg.developer ? arg.developer : ''
    return gulp.src([
        // "../assets/11/css/main.less",
        // "../assets/11/css/project.less",
        // "../assets/11/css/modules/font-shoptet.less",
        "../theme/assets/less/main.less"
    ])
        .pipe(watchErrors())
        .pipe($.less(
            {
                javascriptEnabled: true,
                modifyVars: {
                    "fontPath": "./fonts/shoptet/",
                    "imgPath": "./img/",
                    "colorPrimary": "#00a078"
                }
            }
            )
        )
        .pipe($.concat('main.css'))
        .pipe($.cssnano({
                discardComments: {removeAll: true},
                autoprefixer: {
                        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'Android 2.3'],
                        add: true
                }
        }))
        .pipe(gulp.dest('../assets/dist' + developer + '/'))
});

gulp.task('build:js',  function () {
    const developer = arg.developer ? arg.developer : ''
    return gulp.src(
        [
            // "../assets/shared/js/modules/jquery.unveil.js",
            // "../assets/shared/js/bootstrap/transition.js",
            // "../assets/shared/js/bootstrap/carousel.js",
            // "../assets/shared/js/bootstrap/dropdown.js",
            // "../assets/shared/js/bootstrap/tab.js",
            // "../assets/shared/js/bootstrap/tooltip.js",
            // "../assets/shared/js/jqueryui/core.js",
            // "../assets/shared/js/jqueryui/widget.js",
            // "../assets/shared/js/jqueryui/mouse.js",
            // "../assets/shared/js/jqueryui/position.js",
            // "../assets/shared/js/jqueryui/autocomplete.js",
            // "../assets/shared/js/jqueryui/button.js",
            // "../assets/shared/js/jqueryui/datepicker.js",
            // "../assets/shared/js/jqueryui/i18n/datepicker-cs.js",
            // "../assets/shared/js/jqueryui/menu.js",
            // "../assets/shared/js/jqueryui/selectmenu.js",
            // "../assets/shared/js/jqueryui/slider.js",
            // "../assets/shared/js/modules/jquery.ui.touch-punch.js",
            // "../assets/shared/js/modules/jquery.colorbox.js",
            // "../assets/shared/js/libs/scripts.js",
            // "../assets/shared/js/libs/dev.js",
            // "../assets/shared/js/libs/custom.js",
            // "../assets/shared/js/libs/config.js",
            // "../assets/shared/js/libs/runtime.js",
            // "../assets/shared/js/libs/modal.js",
            // "../assets/shared/js/libs/common.js",
            // "../assets/shared/js/libs/cookie.js",
            // "../assets/shared/js/libs/helpers.js",
            // "../assets/shared/js/libs/tracking.js",
            // "../assets/shared/js/libs/image360.js",
            // "../assets/shared/js/libs/stockAvailabilities.js",
            // "../assets/shared/js/libs/variants/surcharges.js",
            // "../assets/shared/js/libs/variants/common.js",
            // "../assets/shared/js/libs/variants/simple.js",
            // "../assets/shared/js/libs/variants/split.js",
            // "../assets/shared/js/libs/variants/unavailable.js",
            // "../assets/shared/js/libs/ajax/request.js",
            // "../assets/shared/js/libs/ajax/response.js",
            // "../assets/shared/js/libs/cart.js",
            // "../assets/shared/js/libs/cartShared.js",
            // "../assets/shared/js/libs/validator/helpers.js",
            // "../assets/shared/js/libs/validator/validator.js",
            // "../assets/shared/js/libs/validator/phone.js",
            // "../assets/shared/js/libs/validator/zipcode.js",
            // "../assets/shared/js/libs/validator/companyid.js",
            // "../assets/shared/js/libs/validator/required.js",
            // "../assets/shared/js/libs/phoneInput.js",
            // "../assets/shared/js/libs/cofidis.js",
            // "../assets/shared/js/libs/adminBar.js",
            // "../assets/shared/js/modules/validator.js",
            // "../assets/shared/js/modules/jquery.cloud-zoom.1.0.2.js",
            // "../assets/shared/js/modules/cloudZoomInit.js",
            // "../assets/shared/js/modules/tabsAccordion.js",
            // "../assets/shared/js/modules/tabsResponsive.js",
            // "../assets/shared/js/modules/topNavigationMenu.js",
            // "../assets/shared/js/modules/globalFunctions.js",
            // "../assets/shared/js/modules/menu.js",
            // "../assets/shared/js/modules/products.js",
            // "../assets/shared/js/modules/search.js",
            // "../assets/shared/js/modules/filters.js",
            // "../assets/shared/js/modules/productInnerSecondImage.js",
            // "../assets/shared/js/modules/smartLabels.js",
            // "../assets/shared/js/libs/checkout.js",
            // "../assets/shared/js/libs/checkoutShared.js",
            // "../assets/shared/js/modules/twisto.js",
            "../theme/assets/js/modules/eshopDetail.js",
            "../theme/assets/js/modules/product.js",
            "../theme/assets/js/modules/eshopList.js",
            "../theme/assets/js/modules/homepage.js",
            "../theme/assets/js/modules/footer.js",
            "../theme/assets/js/modules/header.js",
            "../theme/assets/js/main.js"
        ],{ allowEmpty: true }
    )
        .pipe(watchErrors())
        // .pipe($.stripDebug())
        .pipe($.terser())
        .pipe($.concat('build.min.js'))
        .pipe(gulp.dest('../assets/dist' + developer + '/'))
});

gulp.task('buildHead:js', function (){
    const developer = arg.developer ? arg.developer : ''
    return gulp.src(
        [
            "../theme/assets/js/headModules/sdkSettings.js",
            "../theme/assets/js/headModules/loadDictionary.js",
            "../theme/assets/js/headModules/translator.js",
        ],{ allowEmpty: true }
    )
        .pipe(watchErrors())
        // .pipe($.stripDebug())
        .pipe($.terser())
        .pipe($.concat('buildHead.min.js'))
        .pipe(gulp.dest('../assets/dist' + developer + '/'))
})

gulp.task('production', gulp.series('build:less', 'buildHead:js', 'build:js'));
