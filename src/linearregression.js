export class  LinearRegression  {
 constructor(){
    this.equation = function (data) {


        var m, c;
        var dataLength = data.length;

        if (dataLength === 1) {
            m = 0;
            c = data[0][1];
        } else {
            var sumX = 0,
                sumY = 0,
                sumXX = 0,
                sumXY = 0;
            var point, x, y;
            for (var i = 0; i < dataLength; i++) {
                point = data[i];
                x = point[0];
                y = point[1];

                sumX += x;
                sumY += y;

                sumXX += x * x;
                sumXY += x * y;
            }
            m = ((dataLength * sumXY) - (sumX * sumY)) /
                ((dataLength * sumXX) - (sumX * sumX));
            c = (sumY / dataLength) - ((m * sumX) / dataLength);
        }

        // Return both values as an object.
        return {
            m: m,
            c: c
        };
    }
}
}

