import React, {Component} from 'react'
import Tour from 'reactour'
import withViewport from "../../../shared-components/withViewport"
import {_getTouringState, _turnOffTouringState} from "../../../services/TouringServices"


const steps = [
    {
        selector: '.SidebarDashboard  .nav .nav-item:nth-child(4)',
        content: 'This is Keywords tab.It bring you the hottest, most popular keywords for your listing and niche finding',
    },
    {
        selector: '.KeywordResults ',
        content: 'This tab provides appearance counts, rank filter, and time filter. Click on the keyword to search in the Products tab.',
    },
    {
        selector: '.SidebarDashboard  .nav .nav-item:nth-child(6)',
        content: 'Click "Trademark" tab to continue',
    },


]

class KeywordsTour extends Component {
    state = {
        isOpen: false,
    }

    componentDidMount() {
        this._fetchTouringState()

    }

    _fetchTouringState = ()=>{
        _getTouringState()
            .then(result => {
                if (result.success){
                    this.setState({
                        isOpen: result.data,
                    })
                }
            })
            .catch(error=>{
                console.error(error)
            })
    }

    _handleCloseTour = () => {
        this.setState({
            isOpen: false,
        })
        console.log("lo mom")
        _turnOffTouringState()
            .then(result => {
                if (result.success) {
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        const {isOpen} = this.state
        return (
            <Tour
                isOpen={isOpen}
                onRequestClose={this._handleCloseTour}
                steps={steps}
                nextButton={
                    <div className='btn btn-primary '>Next</div>
                }
                prevButton={
                    <div className='btn btn-primary '>Prev</div>
                }
                lastStepNextButton={
                    <div/>
                }
                rounded={5}
                disableKeyboardNavigation={true}
                showNumber={false}/>

        )
    }
}

export default withViewport(KeywordsTour)
