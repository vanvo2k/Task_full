import React, {Component} from "react";
import Tour from 'reactour';
import withViewport from "../../../shared-components/withViewport"
import {_getTouringState, _turnOffTouringState} from "../../../services/TouringServices"


const steps = [
    {
        selector: '.ResizeImagesPage .container',
        content: 'Image Resizer: Resize your artwork to match Merch by Amazon requirement format in just a second',
    },


];

class ResizeImagesTour extends Component {
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
                    <div className='btn btn-primary'>Next</div>
                }
                prevButton={
                    <div className='btn btn-primary'>Prev</div>
                }
                lastStepNextButton={
                    <div className='btn btn-success'>Done</div>
                }
                rounded={5}
                disableKeyboardNavigation={true}
                showNumber={false}/>

        )
    }
}

export default withViewport(ResizeImagesTour);