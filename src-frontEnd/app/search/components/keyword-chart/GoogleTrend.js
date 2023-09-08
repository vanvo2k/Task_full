import React, { Fragment } from 'react'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'

const makeReq = (comparisonItems, time = 'today 12-m') => ({
  comparisonItem: comparisonItems.map(item => ({ keyword: item.keyword, geo: item.geo, time })),
  category: 0,
  property: ''
})
const makeTrendItem = (keyword, geo = 'US') => ({
  keyword,
  geo,
})

const MAX_COMPARE_ITEMS = 4
const BASE_URL_GOOGLE_TREND = 'https://trends.google.com:443/trends/embed/explore/TIMESERIES'

class GoogleTrend extends React.Component {
  state = {
    comparedItems: [],
    geo: 'US',
    queryString:``,
  }

componentDidMount(){
  const { searchTermQuery} = this.props
  const { comparedItems, geo} = this.state
  const originalTerm = makeTrendItem(searchTermQuery, geo)
  const comparisonTerm = comparedItems.map(item => makeTrendItem(item.keyword, geo)).filter(item => item.keyword)
  const totalTerms = [originalTerm, ...comparisonTerm]
  const offset = new Date().getTimezoneOffset()
  const filterTime = 'today 12-m' // 12 months
  const filterString = makeReq(totalTerms, filterTime)
  this.setState({queryString:`${BASE_URL_GOOGLE_TREND}?req=${encodeURIComponent(JSON.stringify(filterString))}&tz=${offset.toString()}&eq=q%3Dbrexit${encodeURIComponent(`&geo=${this.state.geo}&date=${filterTime}`)}`})
}

_delay=null
  handleBindInputState = (e, item) => {
    const { value } = e.target
    this.setState({
      comparedItems: this.state.comparedItems.map(t => {
        if (t.id === item.id) {
          return {
            ...t,
            keyword: value,
          }
        } else {
          return t
        }
      })
    })
    const comparedItems=this.state.comparedItems.map(t => {
      if (t.id === item.id) {
        return {
          ...t,
          keyword: value,
        }
      } else {
        return t
      }
    })
    const { searchTermQuery} = this.props
    const { geo } = this.state
    const originalTerm = makeTrendItem(searchTermQuery, geo)
    const comparisonTerm = comparedItems.map(item => makeTrendItem(item.keyword, geo)).filter(item => item.keyword)
    const totalTerms = [originalTerm, ...comparisonTerm]
    const offset = new Date().getTimezoneOffset()
    const filterTime = 'today 12-m' // 12 months
    const filterString = makeReq(totalTerms, filterTime)
    this._delay && clearTimeout(this._delay);
    this._delay = setTimeout(() => {
      this.setState({queryString:`${BASE_URL_GOOGLE_TREND}?req=${encodeURIComponent(JSON.stringify(filterString))}&tz=${offset.toString()}&eq=q%3Dbrexit${encodeURIComponent(`&geo=${this.state.geo}&date=${filterTime}`)}`})
    }, 1000);
  }

  handleAddBtn = e => {
    const id = uuidv4().toString()
    const currComparedItems = this.state.comparedItems
    if (currComparedItems.length === 0) {
      this.setState({
        comparedItems: [...this.state.comparedItems, { id, keyword: '' }],
      })
      return
    }

    if (currComparedItems.every(item => item.keyword)) {
      this.setState({
        comparedItems: [...this.state.comparedItems, { id, keyword: '' }],
      })
    }
  }

  handleKeyDown = (e) => {
    if (e.key === ',') {
      this.handleAddBtn(e)
    }
  }

  handleClearInput = (e, item) => {
    this.setState({
      comparedItems: this.state.comparedItems.filter(t => t.id !== item.id)
    })
  const { searchTermQuery} = this.props
  const { comparedItems, geo} = this.state
  const originalTerm = makeTrendItem(searchTermQuery, geo)
  const comparisonTerm = comparedItems.filter(t => t.id !== item.id).map(item => makeTrendItem(item.keyword, geo)).filter(item => item.keyword)
  const totalTerms = [originalTerm, ...comparisonTerm]
  const offset = new Date().getTimezoneOffset()
  const filterTime = 'today 12-m' // 12 months
  const filterString = makeReq(totalTerms, filterTime)
  this.setState({queryString:`${BASE_URL_GOOGLE_TREND}?req=${encodeURIComponent(JSON.stringify(filterString))}&tz=${offset.toString()}&eq=q%3Dbrexit${encodeURIComponent(`&geo=${this.state.geo}&date=${filterTime}`)}`})
  }

  render() {
    const { searchTermQuery, className } = this.props
    const { comparedItems, geo,queryString } = this.state
    const originalTerm = makeTrendItem(searchTermQuery, geo)
    const comparisonTerm = comparedItems.map(item => makeTrendItem(item.keyword, geo)).filter(item => item.keyword)
    const totalTerms = [originalTerm, ...comparisonTerm]
    const offset = new Date().getTimezoneOffset()
    const filterTime = 'today 12-m' // 12 months
    const filterString = makeReq(totalTerms, filterTime)
    // const queryString = `${BASE_URL_GOOGLE_TREND}?req=${encodeURIComponent(JSON.stringify(filterString))}&tz=${offset.toString()}&eq=q%3Dbrexit${encodeURIComponent(`&geo=${this.state.geo}&date=${filterTime}`)}`

    return (
      <Fragment>
        <div className={classNames('KeywordGoogleTrend', className)}>
          <div className={classNames('SearchTermContainer', className)}>
            <div className={classNames('SearchTermWrapper', className)}>
              <div className={classNames('SearchTermCentralize', className)}>
                <input
                  className={classNames('SearchTermInput', className)}
                  value={searchTermQuery}
                  readOnly
                />
                <div className={classNames('SearchTermDescription', className)}>
                  <span>Search term</span>
                </div>
              </div>
            </div>
            {comparedItems.map(item => (
                  <div key={item.id} className={classNames('SearchTermWrapper', className)}>
                    <div className={classNames('SearchTermCentralize', className)}>
                      <input
                        placeholder="Add a search term"
                        className={classNames('SearchTermInput', className)}
                        value={comparedItems.find(t => t.id === item.id).keyword}
                        onChange={e => this.handleBindInputState(e, item)}
                        onKeyDown={e => this.handleKeyDown(e)}
                      />
                      {item.keyword
                        ? <div
                          className={classNames('SearchTermCancel', className)}
                          onClick={e => this.handleClearInput(e, item)}
                        >
                          X
                        </div>
                        : <div className={classNames('SearchTermDescription', className)}>
                          <span>Search term</span>
                        </div>
                      }
                    </div>
                  </div>
                ))}
            {comparedItems.length < MAX_COMPARE_ITEMS && <div className={classNames('SearchTermAddBtn', className)} onClick={this.handleAddBtn}>
              <i className="linear-plus" />
              <span>
                Add comparison
              </span>
            </div>}
          </div>
        </div>

        {queryString && <iframe
          key={searchTermQuery}
          id="trends-widget-2"
          src={queryString}
          width="100%"
          height="450px"
          frameBorder="0"
          loading="lazy"
        />}
      </Fragment>
    )
  }
}

export default GoogleTrend
