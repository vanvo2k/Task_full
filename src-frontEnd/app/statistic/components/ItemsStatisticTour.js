import React, {Component} from "react";
import Tour from 'reactour';
import withViewport from "../../../shared-components/withViewport"
import {_getTouringState, _turnOffTouringState} from "../../../services/TouringServices"


const steps = [
    {
        selector: '.SidebarDashboard .nav .nav-item:nth-child(7)',
        content: 'Statistic tab show a lot of helpful information',
    },
    {
        selector: '.ItemsStatistic .StatisticUpdate',
        content: 'Stats of Merch by Amazon Market. This is the largest database on Earth.',
    },
    {
        selector: '.ItemsRandom.FeaturedItems',
        content: 'A new feature: Random products. Helped a lot when you\'re out of idea. Press the refresh button to renew the random.',
    },
    {
        selector: '.SidebarDashboard .nav .nav-item:nth-child(8)',
        content: 'Click here to continue',
    },


];

class ItemsStatisticTour extends Component {
    state = {
        isOpen: false,
    }

    componentDidMount() {
        this._fetchTouringState();
    }

    _fetchTouringState = () => {
        _getTouringState()
            .then(result => {
                if (result.success) {
                    this.setState({
                        isOpen: result.data,
                    })
                }
            })
            .catch(error => {
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

export default withViewport(ItemsStatisticTour);