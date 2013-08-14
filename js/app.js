var trackScreen = {

    createLayout: function(){

        var layout = {
            size: {
                base : {
                    width: 960,
                    height: 480
                },
                target : {
                    width: 960,
                    height: 480
                },
                device : {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                }
            },
            aspect: {
                base: 0,
                device: 0
            },
            offset: {
                left: 0,
                top: 0
            },
            scale:1
        };

        layout.aspect.base = layout.size.base.width / layout.size.base.height;
        layout.aspect.device = layout.size.device.width / layout.size.device.height;
        layout.scale = (layout.size.device.height / layout.size.base.height);

        return layout;
    },

    createMarker: function(scale){
        var marker = new Kinetic.Group({scale:scale});

        //drop shadow
        marker.add(new Kinetic.Path({
            data: 'M71.7,68.4c10.9-9.3,14.9-22.5,8.9-29.5c-3-3.5-7.9-4.8-13.4-4.1S55.5,38.3,50,43c-5.2,4.4-8.8,9.7-10.5,14.8l0,0l-0.3,0.8c0,0,0,0,0,0l-6.3,20.9l21.6-2.9c0,0,0,0,0,0c0,0,0,0,0,0l0.8-0.1l0,0C60.7,75.5,66.5,72.8,71.7,68.4z',
            fill: '#D0D2D3',
            opacity: 0.25
        }));

        // graphic
        var graphic = new Kinetic.Path({
            data: 'M32.9,0C23.8,0,15.6,3.7,9.6,9.6S0,23.8,0,32.9c0,8.6,3.3,16.4,8.8,22.3l0,0l0.9,0.9c0,0,0,0,0,0l23.3,23.3l23.3-23.3c0,0,0,0,0,0c0,0,0,0,0,0l0.9-0.9l0,0c5.4-5.9,8.8-13.7,8.8-22.3C65.9,14.7,51.1,0,32.9,0z M51.7,32.9c0,5-2,9.7-5.5,13.3c-3.5,3.5-8.3,5.5-13.3,5.5c-10.4,0-18.8-8.4-18.8-18.8c0-5,2-9.7,5.5-13.3c3.5-3.5,8.3-5.5,13.3-5.5C43.3,14.1,51.7,22.6,51.7,32.9z',
            fillLinearGradientStartPoint: [0, 0],
            fillLinearGradientEndPoint: [66, 80],
            fillLinearGradientColorStops: [0, '#26A9E0', 1, '#2B388F']
        });

        graphic.on('click',function(e){
            console.log('click',this);
        })
        marker.add(graphic);
        return marker;
    },

    initCanvases: function(layout){

        $('.canvas_wrapper').attr('height', layout.size.device.height + 'px');

        $('canvas').attr('height', layout.size.device.height + 'px');
        $('canvas').attr('width', parseInt($('canvas').width() * layout.scale) + 'px');

        updateStatus('layout',{
            device_width: layout.size.device.width,
            device_height: layout.size.device.height
        });

        var step0Offset = parseInt(-1200 * layout.scale) + 'px'
        util.updateCssRule('#mountain_wrapper.step0','-webkit-transform','translate3d('+step0Offset+',0,0)');
        util.updateCssRule('#mountain_wrapper.step0.out','-webkit-transform','translate3d('+step0Offset+',-100%,0)');
        util.updateCssRule('#trees_wrapper.step0','-webkit-transform','translate3d('+step0Offset+',0,0)');
        util.updateCssRule('#trees_wrapper.step0.out','-webkit-transform','translate3d('+step0Offset+',-100%,0)');
        util.updateCssRule('#grass_wrapper.step0','-webkit-transform','translate3d('+step0Offset+',0,0)');
        util.updateCssRule('#grass_wrapper.step0.out','-webkit-transform','translate3d('+step0Offset+',-100%,0)');
        util.updateCssRule('#marker_wrapper.step0','-webkit-transform','translate3d('+step0Offset+',0,0)');
        util.updateCssRule('#marker_wrapper.step0.out','-webkit-transform','translate3d('+step0Offset+',-100%,0)');
        util.updateCssRule('.canvas_wrapper.out','-webkit-transform','translate3d(0,-100%,0)');

        var stage = new Kinetic.Stage({
            container: 'marker_wrapper',
            width: 3000,
            height: layout.size.device.height,
            scale:1
        });
        var layer = new Kinetic.Layer();

        var marker;

        // we have 7 markers per screen
        var hor_spacing = parseInt(layout.size.device.width  / 7);

        // the 40 is half a marker's width at normal scale
        var hor_alignment = parseInt(hor_spacing/2) - parseInt(40 * layout.scale) ;

        console.log('hor_spacing:',hor_spacing, 'hor_alignment:',hor_alignment);

        for(var i = 0 ; i < 7; i++)
        {
            marker = trackScreen.createMarker(layout.scale);
            marker.setAttr('x', i * hor_spacing + hor_alignment );
            console.log( marker.getAttr('x'));
            marker.setAttr('y',320 * layout.scale);
            layer.add(marker);
        }

        //stage.setScale(layout.scale,layout.scale)
        // add the layer to the stage
        stage.add(layer);

        var imageObj = new Image();
        imageObj.onload = function() {
            var ctx = document.getElementById('mountains_canvas').getContext('2d');
            ctx.scale(layout.scale, layout.scale);
            ctx.drawImage(this, 0, 0);
        };
        imageObj.src = 'img/bg_mountains02.png';


        var imageObj1 = new Image();
        imageObj1.onload = function() {
            var ctx = document.getElementById('trees_canvas').getContext('2d');
            ctx.scale(layout.scale, layout.scale);
            ctx.drawImage(this, 0, 190);
        };
        imageObj1.src = 'img/bg_trees02.png';

        var imageObj2 = new Image();
        imageObj2.onload = function() {
            var ctx = document.getElementById('grass_canvas').getContext('2d');
            ctx.scale(layout.scale, layout.scale);
            ctx.drawImage(this, 0, 270);
        };
        imageObj2.src = 'img/bg_grass.png';

    }

};

var util = {

    updateCssRule : function (theClass,element,value) {
    //Last Updated on July 4, 2011
    //documentation for this script at
    //http://www.shawnolson.net/a/503/altering-css-class-attributes-with-javascript.html
    var cssRules;


    for (var S = 0; S < document.styleSheets.length; S++){


        try{
            document.styleSheets[S].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);

        } catch(err){
            try{document.styleSheets[S].addRule(theClass,element+': '+value+';');

            }catch(err){

                try{
                    if (document.styleSheets[S]['rules']) {
                        cssRules = 'rules';
                    } else if (document.styleSheets[S]['cssRules']) {
                        cssRules = 'cssRules';
                    } else {
                        //no rules found... browser unknown
                    }

                    for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
                        if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
                            if(document.styleSheets[S][cssRules][R].style[element]){
                                document.styleSheets[S][cssRules][R].style[element] = value;
                                break;
                            }
                        }
                    }
                } catch (err){}

            }

        }
    }
}
};


Zepto(function($){

    var layout = trackScreen.createLayout();
    console.log(layout);


    trackScreen.initCanvases(layout);

    $(document.body).on( 'webkitTransitionEnd',
        function( event ) {
            var src = $(event.srcElement);
                console.log(src);
           if(src.hasClass('in') ){
               src.removeClass('in');
           }
        } );

    $('#play').click(function(){
        $('.canvas_wrapper').addClass('step0');
    });

    $('#reverse').click(function(){
        $('.canvas_wrapper').removeClass('step0');
    });

    $('#out').click(function(){
        $('.canvas_wrapper').addClass('out');
    });

    $('#in').click(function(){
        $('.canvas_wrapper').addClass('in');
        $('.canvas_wrapper').removeClass('out');
    });

})


