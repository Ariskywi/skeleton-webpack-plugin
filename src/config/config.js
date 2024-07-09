'use strict'

const staticPath = '__webpack_page_skeleton__'

const defaultOptions = {
    port: '8989',                     //端口号
    // ['spin', 'chiaroscuro', 'shine'],
    loading: 'spin',                  //动画方式
    text: {                           //该配置对象可以配置一个 color 字段，用于决定骨架页面中文字块的的颜色，颜色值支持16进制、RGB等
        color: '#EEEEEE'
    },
    image: {                         //该配置对象可以配置一个 color 字段，用于决定骨架页面中文字块的的颜色，颜色值支持16进制、RGB等，该配置接受 3 个字段，color、shape、shapeOpposite。color 和 shape 用于确定骨架页面中图片块的颜色和形状，颜色值支持16 进制和 RGB等，形状支持两个枚举值，circle （矩形）和 rect（圆形）。shapeOpposite 字段接受一个数组，数组中每个元素是一个 DOM 选择器，用于选择 DOM 元素，被选择 DOM 的形状将和配置的 shape 形状相反，例如，配置的是 rect那么，shapeOpposite 中的图片块将在骨架页面中显示成 circle 形状（圆形）
        // `rect` | `circle`
        shape: 'rect',
        color: '#EFEFEF',
        shapeOpposite: []
    },                               //该配置接受两个字段，color 和 excludes。color 用来确定骨架页面中被视为按钮块的颜色，excludes 接受一个数组，数组中元素是 DOM 选择器，用来选择元素，该数组中的元素将不被视为按钮块。
    button: {
        color: '#EFEFEF',
        excludes: []
    },
    svg: {                           //该配置接受 3 个字段，color、shape、shapeOpposite。color 和 shape 用于确定骨架页面中 svg 块的颜色和形状，颜色值支持16 进制和 RGB等，同时也支持 transparent 枚举值，设置为 transparent 后，svg 块将是透明块。形状支持两个枚举值，circle （矩形）和 rect（圆形）。shapeOpposite 字段接受一个数组，数组中每个元素是一个 DOM 选择器，用于选择 DOM 元素，被选择 DOM 的形状将和配置的 shape 形状相反，例如，配置的是 rect那么，shapeOpposite 中的 svg 块将在骨架页面中显示成 circle 形状（圆形）
        // or transparent
        color: '#EFEFEF',
        // circle | rect
        shape: 'circle',
        shapeOpposite: []
    },
    pseudo: {                       //该配置接受两个字段，color 和 shape。color 用来确定骨架页面中被视为伪元素块的颜色，shape 用来设置伪元素块的形状，接受两个枚举值：circle 和 rect。
        // or transparent
        color: '#EFEFEF',
        // circle | rect
        shape: 'circle',
        shapeOpposite: []
    },
    device: 'iPhone 6 Plus',       //用来设置你在哪款移动设备的模拟器上生成骨架页面
    debug: true,                  //是否开启 debug 模式，当 debug 为 true 时，headless Chromium 控制台的输出信息将在终端输出
    minify: {                      //插件默认会压缩生成的 shell.html 文件，默认压缩配置参见本部分默认配置。可以传递 html-minifier 的配置参数给 mimify，进行按需压缩。当配置为 false 时，不压缩生成的 shell.html 文件，并且会对 shell.html 文件进行格式化处理。
        minifyCSS: { level: 2 },
        removeComments: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: false
    },
    defer: 5000,
    excludes: [],
    remove: [],
    hide: [],
    grayBlock: [],
    cookies: [],
    headless: true,               //是否是headless模式，为了能直观看到页面生成骨架屏的过程，headless可以为false
    h5Only: false,
    // or 'vw|vh|vmin|vmax'
    cssUnit: 'rem',               //其接受的枚举值rem, vw, vh, vmin, vmax
    decimal: 4,                   //生成骨架页面（shell.html）中 css 值保留的小数位数，默认值是 4
    logLevel: 'info',            //在运行插件的过程中，想要打印的消息类型，可选值为info, warn 默认值为 info
    quiet: false,                //是否在终端打印消息，当设置为 true 时，不打印任何消息。
    noInfo: false,               //当设置为 true 时，不打印 info 类型的消息
    logTime: true                //当设置为 true 时，在任何消息前面都会带有一个格式化的时间值
}

const htmlBeautifyConfig = {
    indent_size: 2,
    html: {
        end_with_newline: true,
        js: {
            indent_size: 2
        },
        css: {
            indent_size: 2
        }
    },
    css: {
        indent_size: 1
    },
    js: {
        'preserve-newlines': true
    }
}

module.exports = {
    htmlBeautifyConfig,
    defaultOptions,
    staticPath
}
