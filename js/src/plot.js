import is_array from './is_array'
import is_table from './is_table'
import length from './length'
import { merge } from 'lodash-es'
import sequence from './sequence'
import table from './table'
import title_case from './title_case'

export default function plot (arg1, arg2, ...args) {
  if (is_table(arg1)) return _plot_table(arg1, arg2, ...args)
  else if (is_array(arg1)) {
    if (is_array(arg2)) return _plot_array_array(arg1, arg2, ...args)
    else return _plot_array(arg1, arg2, ...args) 
  }
  else throw new Error('Must be called with a table as the first argument or two arrays as the first two arguments')
}

function _plot_array(y, ...args) {
  return _plot_table(table({
    x: sequence(1, length(y)), 
    y: y
  }), ...args)
}

function _plot_array_array(x, y, ...args) {
  return _plot_table(table({
    x: x,
    y: y
  }), ...args)
}

function _plot_table(table, x, y, options = {}) {
  const columns = Object.keys(table.data)

  if (!x) {
    if (columns.indexOf('x') > -1) x = 'x'
    else x = columns[0]
  }

  if (!y) {
    if (columns.indexOf('y') > -1) y = 'y'
    else y = columns[1]
  }

  let opacity = 0.5

  let size = 10

  let trace = {
    type: 'scatter',
    mode: 'markers',
    x: table.data[x],
    y: table.data[y],
    marker: {
      opacity: opacity,
      size: size,
      sizemode: 'area'
    }
  }

  let layout = options

  layout.xaxis = layout.xaxis || {}
  layout.xaxis.title = layout.xaxis.title || title_case(x)

  layout.yaxis = layout.yaxis || {}
  layout.yaxis.title = layout.yaxis.title || title_case(y)

  // Layout settings that are currently not optional

  const axisSettings = {
    linecolor: 'black',
    linewidth: 1,
    mirror: true, // By apply to both x and y, creates a bounding box
    ticks: 'outside',
    showspikes: false // Don't show "spikes"
  }
  merge(layout.xaxis, axisSettings)
  merge(layout.yaxis, axisSettings)

  layout.margin = {
    l: 40,
    r: 40,
    t: 40,
    b: 40
  }

  return {
    type: 'plotly',
    traces: [trace],
    layout: layout
  }
}

