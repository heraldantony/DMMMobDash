import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import * as d3scale from 'd3-scale'
import * as d3shape from 'd3-shape'
import Axis from './Axis'
import Legend from './Legend'

import { Constants } from './util'

export default class MultiLineChart extends Component {
  static propTypes = {
    linesData: PropTypes.array.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    names: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  constructor(props) {
    super(props)
    this.state = { dimensions: undefined }
    this.startX = 100
    this.viewBoxWidth = 1000
  }

  render() {
    if (this.state.dimensions) {
      var { data, minX, maxX, minY, maxY, dimensions, xScale, yScale } = this.state
      var { width, height, aspectRatio } = dimensions
      var viewBox = { w: this.viewBoxWidth, h: this.viewBoxWidth / aspectRatio }
      var { linesData, colors, names } = this.props
    }
      if (height < 100) height = 300;
     // var style = { flex: 1, alignSelf: 'stretch', height: 200 };
      var style = { width: width, height: height }
      console.log(style)
      return (
          <View style={style}>
              <View style={{ flex: 1 }} onLayout={this.onLayout}>
                  {this.state.dimensions && linesData.length
                      ? <Svg width={width} height={height} viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}>
             <Axis
               width={viewBox.w - 2 * this.startX}
               x={this.startX}
               y={viewBox.h - this.startX}
               ticks={8}
               startVal={minX}
               endVal={maxX}
               scale={xScale}
             />
             <Axis
               width={viewBox.h - 2 * this.startX}
               x={this.startX}
               y={viewBox.h - this.startX}
               ticks={8}
               startVal={minY}
               endVal={maxY}
               scale={yScale}
               vertical
             />
             {data.map(
                  (pathD, i) => <Path fill="none" stroke={colors[i % colors.length]} strokeWidth="5" d={pathD} key={i} />,
                )}
             <Legend
               x={this.startX + 30}
               y={this.startX - 60}
               names={names}
               colors={colors}
             />
           </Svg>
           : undefined} 
              </View>
              </View>
    )
  }

  onLayout = (event) => {
    if (this.state.dimensions) return // layout was already called once
      let { width, height } = event.nativeEvent.layout
      if (height == 0) height = 300;
    const aspectRatio = width / height
    const graphData = this.createGraphData(this.props.linesData, this.props.names, aspectRatio)
    this.setState({ dimensions: { width, height, aspectRatio }, ...graphData })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.dimensions) return
      const aspectRatio = this.state.dimensions.aspectRatio
      console.log(nextProps)
    this.setState({ ...this.createGraphData(nextProps.linesData, nextProps.names, aspectRatio) })
  }

  createGraphData = (linesData, names, aspectRatio) => {
    let yvalues = [] //set of all yvalues
    let minX
    let maxX
    var xvalues = linesData.map((d) => d[0]);
    minX = Math.min(...xvalues)
    maxX = Math.max(...xvalues)
   
    linesData.map((d) => {
      yvalues.push(...d.slice(1));
    });

    const minY = Math.min(...yvalues)
    const maxY = Math.max(...yvalues)

    const { xScale, yScale } = this.createScalesDomain(aspectRatio)
    xScale.range([minX, maxX])
    yScale.range([minY, maxY])
    const data = []
    names.forEach((name, idx) => {
    const lineGenerator = d3shape.line()
      .x(d => xScale.invert(d[0]))
      .y(d => yScale.invert(d[idx+1]))
      data.push(lineGenerator(linesData))
    })
    return { data, minX, maxX, minY, maxY, xScale, yScale }
  }

  createScalesDomain = (aspectRatio) => {
    const viewBoxWidth = this.viewBoxWidth
    const viewBoxHeight = viewBoxWidth / aspectRatio
    const startX = this.startX
    const startY = viewBoxHeight - startX
    //const xScale = d3scale.scaleTime()
    const xScale = d3scale.scaleLinear()
    xScale.domain([startX, viewBoxWidth - startX])
    const yScale = d3scale.scaleLinear().domain([startY, startX])
    return { xScale, yScale }
  }
}

const styles = {
  text: {
    color: Constants.commonDefaultProps.strokeColor,
  },
}
