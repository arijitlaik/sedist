import {ArithmeticProbabilityPaper, app_yaxis, y_axis} from './arithmeticprobabilitygraph.js';
let probPaper = new ArithmeticProbabilityPaper;
import regression from 'regression';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import OfflineExporting from 'highcharts/modules/offline-exporting';

Exporting(Highcharts);
OfflineExporting(Highcharts);
import * as astm from './astmdata.js';
//console.log(astm.astmSievemmtoPhi)

var Genbutton = document.getElementById("tada");
var Linebutton = document.getElementById("draw_lrs");
var Intxbutton = document.getElementById("draw_int");
var injectxbutton = document.getElementById("inject_test");
var plotbutton = document.getElementById("plot_data");
Linebutton.onclick = function() {
  drawlinselected(chart.getSelectedPoints())
}
Intxbutton.onclick = function() {
  drawinters()
}

const testWithSand = [
  410.2,
  380.0,
  326.2,
  399.4,
  239.8,
  344.2,
  378.4,
  340.4,
  386.6,
  343.8,
  328.8,
  330.2,
  363.0,
  366.4,
  423.4
];
const testEmpty = [
  410.0,
  379.8,
  326.0,
  399.2,
  239.0,
  344.0,
  377.4,
  340.4,
  383.4,
  341.4,
  323.0,
  330.0,
  358.4,
  364.2,
  421.2
];

const cuEmpty = [
  308.2,
  343.6,
  330.6,
  330,
  357,
  327.2,
  323.2,
  342,
  312,
  325.8,
  313.8,
  311.6,
  308.2,
  310.8,
  303.6,
  308
];

injectxbutton.onclick = function() {
  document.getElementById("startSieve").value = 30
  Genbutton.click();
  var emptyWt = document.getElementsByClassName('withsandWt')
  testWithSand.map((e, i) => emptyWt[i].value = e)
  emptyWt = document.getElementsByClassName('emptyWt')
  testEmpty.map((e, i) => emptyWt[i].value = e)
}

plotbutton.onclick = function() {
  calc_percentage()
  plot_Data()
}

function calc_percentage() {
  var tabData = astm.astmData.filter(e => e.no >= startSieve && e.no <= endSieve)
  var emptyWt = document.getElementsByClassName('emptyWt')
  var withSandWt = document.getElementsByClassName('withsandWt')
  var sandWt = Array.from(document.getElementsByClassName('sandWt'))
  var sumWts = 0
  sandWt.map((e, i) => {
    e.innerHTML = (+ withSandWt[i].value - + emptyWt[i].value).toPrecision(3)
    sumWts += + e.innerHTML

  })
  console.log(sumWts)
  var perWt = Array.from(document.getElementsByClassName('perWt'))
  var cumWt = Array.from(document.getElementsByClassName('cumWt'))
  cumfVals = []
  perWt.map((e, i) => {
    e.innerHTML = (100 * (sandWt[i].innerHTML / sumWts))
    cumWt[i].innerHTML = + (
      i == 0
      ? 0
      : (cumWt[i - 1].innerHTML)) + + e.innerHTML
    e.innerHTML = (+ e.innerHTML).toFixed(3)
    cumfVals.push(+ cumWt[i].innerHTML)

  })
  cumWt.map(e => e.innerHTML = (+ e.innerHTML).toPrecision(3))
  console.log(cumfVals)

}

var startSieve,
  endSieve = 0,
  phiVals = [],
  cumfVals = [];
Genbutton.onclick = function() {
  parseFormData();
  //console.log(startSieve,endSieve);
  var tabData = astm.astmData.filter(e => e.no >= startSieve && e.no <= endSieve)
  phiVals = [];
  var table = document.getElementById("inpTableBody");
  table.innerHTML = "";
  tabData.map(e => {
    phiVals.push(e.phi)
    table.innerHTML += "<tr>" + "<td>" + e.no + '</td>' + "<td>" + e.mm.toFixed(3) + "</td>" + "<td>" + e.phi.toPrecision(2) + "</td>" + '<td><input type="number"  step="0.01" class="emptyWt"></td><td><input type="number"  step="0.01" class="withsandWt"></td><td class="sandWt"></td><td class="perWt"></td><td class="cumWt"></td>' + "</tr>"
  })
  table.innerHTML += "<tr>" + "<td>" + "Pan" + '</td>' + "<td>" + "" + "</td>" + "<td>" + "" + "</td>" + '<td><input type="number"  step="0.01" class="emptyWt"></td><td><input type="number"  step="0.01" class="withsandWt"></td><td class="sandWt"></td><td class="perWt"></td><td class="cumWt"></td>' + "</tr>"
  if (document.getElementById('cuEmptyCheck').checked) {
    var emptyWt = document.getElementsByClassName('emptyWt')
    cuEmpty.map((e, i) => emptyWt[i].value = e)
  }
}

function parseFormData() {
  startSieve = document.getElementById("startSieve").value;
  endSieve = document.getElementById("endSieve").value;
}

var ur_sl = []
var segs = [];
var intxs = [];
function plot_Data() {
  phi_cumft = cumfVals.map((e, i) => [phiVals[i], probPaper.yAxis(e)]);
  phi_cumft[phi_cumft.length-1][0]=4.25;
  phi_cumft[phi_cumft.length-1][1]=probPaper.yAxis(99.99);

  console.log(phi_cumft)
  console.log(probPaper.yAxis(99.99))
  console.log(probPaper.yAxis(100))

  chart.addSeries({name: 'Test', color: 'rgba(223, 83, 83, .5)', data: phi_cumft})
}

var phi_cumft = []

var chart = new Highcharts.Chart('container', {
  chart: {
    type: 'scatter',
    zoomType: 'xy'
  },
  title: {
    text: 'Sediment Grain Size Distributions'
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    gridLineWidth: 1,
    title: {
      enabled: true,
      text: 'Grain Size (Φ)'
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true
  },
  yAxis: {
    gridLineWidth: 1,
    title: {
      text: 'Cumulative Probability (%)'
    },
    tickPositioner: function() {
      return app_yaxis
    },
    labels: {
      formatter: function() {
        //console.log(this)
        return probPaper.yInverse(this.value).toFixed(2);
      }
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true

  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 70,
    y: 50,
    floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
    borderWidth: 1
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        headerFormat: '',
        //pointFormat: '{point.x} phi, {app_y(point.y)} %',
        pointFormatter: function() {
          return (this.x.toPrecision(2) + "Φ, " + probPaper.yInverse(this.y).toFixed(2) + " %")
        }
      }
    },
    series: {
      cursor: 'pointer',
      events: {
        click: function(evt) {
          console.log(evt.point)

          evt.point.select(null, true);

        }
      }
    }
  },

  credits: {
    enabled: false
  }
});

function unselectpoints() {
  var points = chart.getSelectedPoints();
  if (points.length > 0) {
    Highcharts.each(points, function(point) {
      point.select(false);
    });
  }
}

function toast(chart, text) {
  chart.toast = chart.renderer.label(text, 100, 120).attr({fill: Highcharts.getOptions().colors[0], padding: 10, r: 5, zIndex: 8}).css({color: '#FFFFFF'}).add();

  setTimeout(function() {
    chart.toast.fadeOut();
  }, 2000);
  setTimeout(function() {
    chart.toast = chart.toast.destroy();
  }, 2500);
}

function drawlinselected(pts) {
  if (pts.length > 1) {
    var xyToArr = pts.map(function(pt) {
      return [pt.x, pt.y]
    }).sort();

    //data.push([chart.series[0].data[points.length].x,null])
    var lineEq = regression.linear(xyToArr);
    var m = lineEq.equation[0];
    var c = lineEq.equation[1];
    var r2 = lineEq.r2
      console.log(r2)
      segs.push(lineEq.equation)
      var xs = xyToArr[xyToArr.length - 1][0] + .25,
        xl = xyToArr[0][0] - .25;

      var linept = []
      linept.push([
        xl, m * xl + c
      ], [
        xs, m * xs + c
      ]);

      chart.addSeries({
        type: 'line',
        name: 'Segment ' + segs.length,
        data: linept,
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidth: 0
          }
        },
        enableMouseTracking: false
      })
      unselectpoints();

      console.log(lineEq)
    } else
      toast(chart, "Select atleast 2points")
  }

  function calc_inter(segs) {
    var inters = []
    console.log(segs)
    for (var i = 1; i < segs.length; i++) {
      console.log(i)
      var m1 = segs[i - 1][0];
      var m2 = segs[i][0];
      var c1 = segs[i - 1][1];
      var c2 = segs[i][1];
      var x = (c2 - c1) / (m1 - m2)
      var y = m1 * x + c1;
      inters.push([x, y]);
    }
    return inters
    console.log(inters)
  }

  function drawinters() {
    intxs = calc_inter(segs);
    chart.addSeries({name: "intersections", data: intxs})
  }

  function piecewiseLinearValue(xy, intersections, segments) {
    var i = 0;
    var isY = 0;
    var xory = 0
    if (xy.x == undefined)
      isY = 1,
      xory = xy.y
    else if (xy.y == undefined)
      isY = 0,
      xory = xy.x
    else {
      console.error("xory needs and x or y");
      return
    }
    for (i; i < intersections.length && !(intersections[i][isY] > xory); i++)
    ;
    if (isY)
      return (xory - segments[i].c) / segments[i].m
    else
      return segments[i].m * xory + segments[i].c
  }
