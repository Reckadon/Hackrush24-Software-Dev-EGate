/* eslint-disable react/prop-types */
import CheckIcon from "@mui/icons-material/Check";

const VerifiedUserBlock = ({ userData }) => {
	return (
		<div className="user-block">
			<CheckIcon />
			<img src={userData.profile} />
			Name: {userData.name} <br />
		</div>
	);
};

export default VerifiedUserBlock;
