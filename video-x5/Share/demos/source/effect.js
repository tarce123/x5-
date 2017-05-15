/**
 * Canvas Effect Collections
 */
var effect = {
    // cameo
    cameo: function(canvasData){
        for ( var x = 0; x < canvasData.width; x++) {
            for ( var y = 0; y < canvasData.height; y++) {
            // Index of the pixel in the array
            var idx = (x + y * canvasData.width) * 4;
            var r = canvasData.data[idx + 0];
            var g = canvasData.data[idx + 1];
            var b = canvasData.data[idx + 2];
            var idx2 = (x + (y+1) * canvasData.width) * 4;
            var r2 = canvasData.data[idx2 + 0];
            var g2 = canvasData.data[idx2 + 1];
            var b2 = canvasData.data[idx2 + 2];
            var fr=r2-r+128;
            var fg=g2-g+128;
            var fb=b2-b+128;
            
            var gray = .299 * fr + .587 * fg + .114 * fb;
            canvasData.data[idx + 0] = gray; // Red channel
            canvasData.data[idx + 1] = gray; // Green channel
            canvasData.data[idx + 2] = gray; // Blue channel
            canvasData.data[idx + 3] = 255; // Alpha channel

            // add black border
            if(x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8)) {
                    canvasData.data[idx + 0] = 0;
                    canvasData.data[idx + 1] = 0;
                    canvasData.data[idx + 2] = 0;
                }
            }
        }
        return canvasData;
    },

    // gray
    gary: function(sourceData){
        var data = sourceData.data;
        // Loop through the pixels, turning them grayscale
        for(var i = 0; i < data.length; i+=4) {
            var r = data[i];
            var g = data[i+1];
            var b = data[i+2];
            var brightness = (3*r+4*g+b)>>>3;
            data[i] = brightness;
            data[i+1] = brightness;
            data[i+2] = brightness;
        }
        return sourceData[data] = data;
    },
    
    // old-school
    old: function(canvasData) {
        for (var x = 0; x < canvasData.width; x++) {
            for (var y = 0; y < canvasData.height; y++) {

                // Index of the pixel in the array
                var idx = (x + y * canvasData.width) * 4;
                var r = canvasData.data[idx + 0];
                var g = canvasData.data[idx + 1];
                var b = canvasData.data[idx + 2];

                var dr = .393 * r + .769 * g + .189 * b;
                var dg = .349 * r + .686 * g + .168 * b;
                var db = .272 * r + .534 * g + .131 * b;
                var scale = Math.random() * 0.5 + 0.5;
                var fr = scale * dr + (1 - scale) * r;
                scale = Math.random() * 0.5 + 0.5;
                var fg = scale * dg + (1 - scale) * g;
                scale = Math.random() * 0.5 + 0.5;
                var fb = scale * db + (1 - scale) * b;
                canvasData.data[idx + 0] = fr; // Red channel
                canvasData.data[idx + 1] = fg; // Green channel
                canvasData.data[idx + 2] = fb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel 
                // add black border
                if (x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8)) {
                    canvasData.data[idx + 0] = 0;
                    canvasData.data[idx + 1] = 0;
                    canvasData.data[idx + 2] = 0;
                }
            }
        }
        return canvasData;
    },
    //算法:
    //R = |g – b + g + r| * r / 256
    //G = |b – g + b + r| * r / 256;
    //B = |b – g + b + r| * g / 256;
    comic: function(canvasData) {
        for (var x = 0; x < canvasData.width; x++) {
            for (var y = 0; y < canvasData.height; y++) {

                // Index of the pixel in the array
                var idx = (x + y * canvasData.width) * 4;
                var r = canvasData.data[idx + 0];
                var g = canvasData.data[idx + 1];
                var b = canvasData.data[idx + 2];
                
                // rgbs
                var fr = Math.abs((g - r + g + b)) * r / 256;
                var fg = Math.abs((b - r + g + b)) * r / 256;
                var fb = Math.abs((b - r + g + b)) * g / 256;
                //var fr=(g-r+g+b)*r/256;
                //var fg=(b-r+g+b)*r/256;
                //var fb=(b-r+g+b)*g/256;  
                canvasData.data[idx + 0] = fr; // Red channel
                canvasData.data[idx + 1] = fg; // Green channel
                canvasData.data[idx + 2] = fb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
                // add black border
                if (x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8)) {
                    canvasData.data[idx + 0] = 0;
                    canvasData.data[idx + 1] = 0;
                    canvasData.data[idx + 2] = 0;
                }
            }
        }
        return canvasData;
    }
};