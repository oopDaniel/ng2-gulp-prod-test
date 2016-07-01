

import { Directive, ElementRef, Attribute, Input, OnChanges } from '@angular/core';
import 'd3';

const DONUT = {
  DEFAULT: {
    CANVAS : {
      w: 300,
      h: 300
    },
    RADIUS: 100,
    RADIUS_PADDING: 18,
    FIN_ANGLE: Math.PI * 2,
    COLOR: '#e2e1e7',
    TEXT: {
      TITLE: {
        top: '4',
        left: '0',
        size: '3.5em'
      },
      TOTAL: {
        top: '36',
        left: '0',
        size: '1.2em'
      }
    }
  }
}


@Directive({
  selector: 'donut-graph'
})

export class DonutGraph implements OnChanges {
  @Input() data: Array<number>;
  @Input() color: string;
  private canvas: any;
  private radius: number;
  private rPadding: number;
  private finAngle: number;
  private showAnimate: boolean;
  private isSort: boolean;
  private showFont: boolean;
  // private color: string;
  private colorArr: Array<string>;
  private delay: number;

  constructor(
    private _elementRef: ElementRef,
    @Attribute('width') _width: string,
    @Attribute('height') _height: string,
    @Attribute('top') _offsetTop: string,
    @Attribute('left') _offsetLeft: string,
    @Attribute('radius') _radius: string,
    @Attribute('padding') _rPadding: string,
    @Attribute('angle') _angle: string,
    @Attribute('sort') _sort: string,
    @Attribute('text') _showFont: string,
    // @Attribute('color') _color: string,
    @Attribute('colorArr') _colorArr: Array<string>,
    @Attribute('animate') _animate: string,
    @Attribute('delay') _delay: string
  ) {

    let offsetTop  = +_offsetTop  || DONUT.DEFAULT.CANVAS.w / 2,
        offsetLeft = +_offsetLeft || DONUT.DEFAULT.CANVAS.h / 2,
        width      = _width       || DONUT.DEFAULT.CANVAS.w,
        height     = _height      || DONUT.DEFAULT.CANVAS.h;

    this.showAnimate = false;
    this.radius   = +_radius   || DONUT.DEFAULT.RADIUS;
    this.rPadding = +_rPadding || DONUT.DEFAULT.RADIUS_PADDING;
    this.finAngle = +_angle    || DONUT.DEFAULT.FIN_ANGLE;

    if (_animate) {
      this.showAnimate = true;
      this.delay = _delay ? +_delay : 100;
    }

    this.isSort =
      (_sort && 'false' !== _sort) ? true : false;

    this.showFont =
      (_showFont && 'false' !== _showFont) ? true : false;

    this.colorArr = _colorArr ?
      _colorArr.filter(d => this._isValidColor(d))
      :
      undefined;

    let el: any     = _elementRef.nativeElement,
        canvas: any = d3.select(el);

    this.canvas = canvas
      .append('svg')
      .attr(
      {
        'class': 'chart',
        'width': width,
        'height': height
      })
      .append("g")
      .attr('transform', `translate(${offsetLeft}, ${offsetTop})`)
      .attr("class", "donut")

  }

  ngOnChanges() {
    // console.log("data changing!")
    this.render(this.data);
  }


  render(data: any) {
    if (!data) return;
    // if ( 2 === data.length ) {
    //   data[1] -= data[0];
    // }

    let hasColor =
      '' !== this.color
      &&
      this._isValidColor(this.color);
    let colorScale: any;

    if (!hasColor) {
      colorScale = this._getColorScale(data.length)
    }
    else {
      colorScale = this.colorArr ?
        d3.scale.ordinal()
          .domain([''+data[0], ''+(data[1] - data[0])])
          .range(this.colorArr)
        :
        d3.scale.ordinal()
          // .domain(d3.extent([data[0], data[1] - data[0]]).map(d => '' + d))
          .domain(['' + data[0], '' + (data[1] - data[0])])
          .range([this.color, DONUT.DEFAULT.COLOR]);
    }

    let pie = this.isSort ?
      d3.layout.pie()
      :
      d3.layout.pie().sort(null);

    let arc = d3.svg.arc()
        .outerRadius(this.radius)
        .innerRadius(this.radius - this.rPadding);


    this.canvas.selectAll(".donut > *").remove();

    let donutsData = this.canvas.selectAll(".donut")
      .data(pie([data[0], data[1] - data[0]]))

    let donuts = donutsData.enter();

    donuts.append("path")
      .attr("d", arc)
      .attr("fill", d => colorScale(d.data) )
      // .attr("opacity", "0.9");

    if (this.showFont) {
        // this._appendText(data[0], d3.sum(data));
        this._appendText(data[0], data[1]);
    }

  }


  private _appendText(centerStr: string, bottomStr: string) {
    this.canvas.append("text")
      .attr('class', 'title')
      .attr('font-size', DONUT.DEFAULT.TEXT.TITLE.size)
      .attr('transform',
        `translate (${DONUT.DEFAULT.TEXT.TITLE.left}, ${DONUT.DEFAULT.TEXT.TITLE.top})`)
      .text(centerStr)

    this.canvas.append("text")
      .attr('class', 'total')
      .attr('font-size', DONUT.DEFAULT.TEXT.TOTAL.size)
      .attr('transform',
      `translate (${DONUT.DEFAULT.TEXT.TOTAL.left}, ${DONUT.DEFAULT.TEXT.TOTAL.top})`)
      .text(`Total: ${bottomStr}`)
  }

  private _getColorScale(count: number, option = '') {
    if (count <= 10) {
      return d3.scale.category10();
    }
    else {
      let optionMap = {
        ''  : d3.scale.category20(),
        'b': d3.scale.category20b(),
        'c': d3.scale.category20c(),
      }
      return optionMap[option]
    }
  }

  private _isValidColor(color: string): boolean {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
  }
}

