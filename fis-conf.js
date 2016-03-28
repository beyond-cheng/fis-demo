var path = require('path');

// npm install [-g] fis3-hook-commonjs
fis.hook('commonjs', {});

fis.match('**mod.*.js', {
        isMod: true 
    })
    .match('common/module/**.js', {
        isMod: true 
    })
    .match('common/js/**.js', {
        isMod: true 
    });


fis.match('**/_*.scss', {
        release: false
    })
    .match('**.scss', {
        rExt: '.css',
        parser: fis.plugin('node-sass-nfd', {})
    });


fis.media('dev')
    .match('*.{png,jpg,gif,js,css,scss,tpl}', {
        url: '/static/pc-dev$0'
    })
    .match(/\/(.+)\.tpl$/, {    // js 模版一律用 .tpl
        isMod: true,
        rExt: 'js',
        id: '$1.tpl',
        moduleId: '$1.tpl',
        url: '/static/pc-dev$0.tpl',
        release: '$0.tpl', // 发布的后的文件名，避免和同目录下的 js 冲突
        parser: fis.plugin('imweb-tplv2')
    })
    .match('::package', {
        prepackager: fis.plugin('csswrapper'),
        postpackager: fis.plugin('loader', {
            processor: {
                // '.jsp': 'html',
                '.html': 'html'
            },
            resourceType: 'mod',
            allInOne: false,
            // obtainStyle: false,
            useInlineMap: true
        })
    })
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: '../fis-demo-dev'
        })
    });


fis.media('dist')
    .match(/\/(.+)\.tpl$/, {    // js 模版一律用 .tpl
        isMod: true,
        rExt: 'js',
        id: '$1.tpl',
        moduleId: '$1.tpl',
        url: '/static/pc-dist$0.tpl',
        release: '$0.tpl', // 发布的后的文件名，避免和同目录下的 js 冲突
        parser: fis.plugin('imweb-tplv2')
    })
    .match('*.png', {
      // fis-optimizer-png-compressor 插件进行压缩，已内置
      // optimizer: fis.plugin('png-compressor')
      // release: false
    })
    .match('*.js', {
        // optimizer: fis.plugin('uglify-js')
    })
    .match('*.{scss,css}', {
      // fis-optimizer-clean-css 插件进行压缩，已内置
      // optimizer: fis.plugin('clean-css')
      // useSprite: true
    })
    .match('*.{png,jpg,gif,js,css,scss,tpl}', {
        useHash: true
    })
    .match('server.js', {
        useHash: false
    })
    .match('fis-conf.js', {
        useHash: false
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: {
                ignore: ['common/dep/**', 'common.css', 'common.scss']
            },
            processor: {
                '.html': 'html',
                '.jsp': 'html'
            },
            useInlineMap: true,
            resourceType: 'mod'
        })
    })
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: '../fis-demo-dist'
        })
    });