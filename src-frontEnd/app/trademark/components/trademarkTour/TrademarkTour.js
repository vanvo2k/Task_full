import React, {Component} from "react"
import Tour from 'reactour'
import withViewport from "../../../../shared-components/withViewport"
import {_getTouringState, _turnOffTouringState} from "../../../../services/TouringServices"


const steps = [
    {
        selector: '.SidebarDashboard  .nav .nav-item:nth-child(6)',
        content: 'This tab check Trademark for clothing goods.',
    },
    {
        selector: '.TrademarkPage .FormCreateTrademark ',
        content: 'Try searching for "You can\'t scare me.',
    },
    {
        selector: '.TrademarkPage .container ',
        content: 'You can search for any words, phrase. Green for safe, red for TM violated. Click on the Red to receive details and Trademark site link.',
    },
    {
        selector: '.SidebarDashboard  .nav .nav-item:nth-child(7)',
        content: 'Click Statistic tab to continue',
    },


]

class TrademarkTour extends Component {
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

export default withViewport(TrademarkTour)
