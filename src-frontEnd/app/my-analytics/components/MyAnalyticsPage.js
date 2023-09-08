import React, {Component} from "react";
import PropTypes from "prop-types";
import Loading from "../../../shared-components/Loading";
import MyAnalyticContainer from "./MyAnalyticContainer";

class MyAnalyticsPage extends Component {
    render() {
        const {loading, items} = this.props;

        return (
            <div className="MyAnalytics">
                <div className="container">
                    <Loading loading={loading}/>

                    <h2 className="Title">My analytics</h2>

                    {
                        items.map(item => {
                            return (
                                <MyAnalyticContainer key={item.get('_id')} item={item}/>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.fetchListMyAnalytics();
    }
}

MyAnalyticsPage.propTypes = {
    loading: PropTypes.bool.isRequired,
    items: PropTypes.object.isRequired,
    fetchListMyAnalytics: PropTypes.func.isRequired,
};

export default MyAnalyticsPage;