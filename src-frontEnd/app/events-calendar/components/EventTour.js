import React, {Component} from "react";
import Tour from 'reactour';
import withViewport from "../../../shared-components/withViewport"
import {_getTouringState, _turnOffTouringState} from "../../../services/TouringServices"

const steps = [
    {
        selector: '.ListEvents .EventItem ',
        content: 'Event tab informs you about every upcoming events and related T-shirts',
    },
    {
        selector: '.ListEvents .EventItem .Products .ListProducts',
        content: 'This contains Event\'s images Detail, Location, Related Products. You can check More Products for more designs ',
    },
    {
        selector: '.SidebarDashboard  .nav .nav-item:nth-child(4)',
        content: 'Click "Keywords" tab to continue',

    },


];

class EventTour extends Component {
    state = {
        isOpen: false,
    }

    componentDidMount() {
        this._fetchTouringState();

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
                console.error(error);
            })
    }

    _handleCloseTour = () => {
        this.setState({
            isOpen: false,
        });
        _turnOffTouringState()
            .then(result => {
                if (result.success) {
                }
            })
            .catch(error => {
                console.error(error);
            })
    };

    render() {
        const {isOpen} = this.state;
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

export default withViewport(EventTour);