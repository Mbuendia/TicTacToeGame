import React from "react";
import PropTypes from "prop-types";




function GenericButton(props) {
    // const [searchData, setSearchData] = useState([...props.data]);
    // const [addLike, setAddLike] = useState([]);

    // useEffect(() => {
    //     setAddLike({ addLike: Array(props.data.length).fill(false) });
    // });
    const { className, handleClick} = props;
    return (
        <button type="button" className={className} onClick={()=> handleClick()}>Restart Game</button>
    );
}

GenericButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
};

export default GenericButton;
