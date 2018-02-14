import {NormalDistibuton} from './normaldistribution.js';
export class ArithmeticProbabilityPaper {
    constructor(yu, yl) {
        var norm = new NormalDistibuton;
        var yu = yu === undefined ? 0.99 : yu;
        var yl = yl === undefined ? 0.01 : yl;
        var zu = norm.ppf(yu);
        var zl = norm.ppf(yl);
        this.yAxis = function (i) {
            var Z = norm.ppf(i / 100)
            return (yl + (yu - yl) * ((Z - zl) / (zu - zl)))
        }

        this.yInverse = function (i) {
            var z = zl + (zu - zl) * ((i - yl) / (yu - yl))
            return norm.cdf(z) * 100
        }
    }
}
export const y_axis = [
  .01,
  .05,
  .1,
  .2,
  .5,
  1,
  2,
  5,
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  95,
  98,
  99,
  99.8,
  99.9,
  99.95,
  99.99
];
export const app_yaxis = [
  -0.28333859617820273,
  -0.1930855511434657,
  -0.15089742033811096,
  -0.10622887397623577,
  -0.04254841798299517,
  0.01,
  0.0674176775369381,
  0.1535435279478445,
  0.23006605154624,
  0.32272883215251735,
  0.3895452163048125,
  0.4466373529420119,
  0.4999999999999999,
  0.5533626470579879,
  0.6104547836951872,
  0.6772711678474824,
  0.76993394845376,
  0.8464564720521552,
  0.9325823224630616,
  0.99,
  1.1062288739762354,
  1.1508974203381175,
  1.1930855511434717,
  1.283338596178132
];
