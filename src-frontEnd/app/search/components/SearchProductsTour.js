import React, {Component} from "react";
import Tour from 'reactour';
import withViewport from "../../../shared-components/withViewport";
import {_getTouringState, _turnOffTouringState} from "../../../services/TouringServices"

const steps = [
    {
        selector: '.SidebarDashboard .SearchProductsMenu',
        content: 'Products tab contains over 10 million shirts with advanced search features.',
    },
    {
        selector: '.SearchItemsPage .SearchControl',
        content: 'Search box: let you search for name, brand, ASIN and exclude multiple keywords.',
    },
    {
        selector: '.SearchItemsPage .FilterControl',
        content: 'Search filters: Provide advanced search filters for time, rank, brands, price, and more.',
    },
    {
        selector: '.SearchItemsPage .SortControl',
        content: 'Sort modes: Manage and order items based on specific criteria.',
    },
    {
        selector: '.SearchItemsPage .AnalyticActions',
        content: 'Too many filters? Use Save Query to store your filter settings and re-access it anytime!',
    },
    {
        selector: '.SearchItemsPage .SwitchLayout',
        content: 'Display mode: You can switch between Grid layout or Row layout',
    },
    {
        selector: '.SidebarDashboard  .nav .nav-item:nth-child(3)',
        content: 'Click "Events" tab to continue',
    },

];

class SearchProductsTour extends Component {
    state = {
        isOpen: false,
    };

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
        const {isMobile} = this.props;

        if (isMobile) {
            return null;
        }

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
                maskSpace={5}
                rounded={5}
                disableKeyboardNavigation={true}
                showNumber={false}

            />
        );
    }
}

export default withViewport(SearchProductsTour);