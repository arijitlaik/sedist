var normal_dist = function () {

    function rational_approximation(t) {
        // Abramowitz and Stegun formula 26.2.23.
        // The absolute value of the error should be less than 4.5 e-4.
        var c = [2.515517, 0.802853, 0.010328];
        var d = [1.432788, 0.189269, 0.001308];
        var numerator = (c[2] * t + c[1]) * t + c[0];
        var denominator = ((d[2] * t + d[1]) * t + d[0]) * t + 1.0;
        return t - numerator / denominator;
    }

    this.ppf = function (p) {
        // See article above for explanation of this section.
        if (p < 0.5) {
            // F^-1(p) = - G^-1(p)
            return -rational_approximation(Math.sqrt(-2.0 * Math.log(p)));
        } else {
            // F^-1(p) = G^-1(1-p)
            return rational_approximation(Math.sqrt(-2.0 * Math.log(1.0 - p)));
        }
    }

    this.cdf = function (x) {
        // constants
        var a1 = 0.254829592;
        var a2 = -0.284496736;
        var a3 = 1.421413741;
        var a4 = -1.453152027;
        var a5 = 1.061405429;
        var p = 0.3275911;

        // Save the sign of x
        var sign = 1;
        if (x < 0) {
            sign = -1;
        }
        x = Math.abs(x) / Math.sqrt(2.0);

        // A&S formula 7.1.26
        var t = 1.0 / (1.0 + p * x);
        var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

        return 0.5 * (1.0 + sign * y);
    }

}
var norm = new normal_dist
