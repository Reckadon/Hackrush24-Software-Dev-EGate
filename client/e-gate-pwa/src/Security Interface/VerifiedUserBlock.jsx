/* eslint-disable react/prop-types */
import CheckIcon from "@mui/icons-material/Check";

const VerifiedUserBlock = ({ userData }) => {
	return (
		<div className="user-block">
			<CheckIcon />
			<img src={userData.profile} />
			<h4>Name: {userData.name} </h4>
			<h5 style={{ textTransform: "capitalize" }}>{userData.userType}</h5>
		</div>
	);
};

export default VerifiedUserBlock;
