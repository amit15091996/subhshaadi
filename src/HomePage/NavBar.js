import React, { useState } from 'react';

function NavBar() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [mobileEmail, setMobileEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };
    const handleHelpClick = () => {
        setShowHelpModal(true);
    };
    const handleCloseModal = () => {
        setShowLoginModal(false);
    };
    const handleCloseModalHelp = () => {
        setShowHelpModal(false);
    };

    const handleMobileEmailChange = (e) => {
        setMobileEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = () => {
        // Handle login submission here
    };

    const handleForgotPasswordClick = () => {
        // Implement logic to handle forgot password action
    };

    return (
        <div className="common_topNavWrap__2q59K" data-testid="navbar" >
            <span className="word" style={{ color: 'deeppink', fontSize: '30px', fontFamily: 'Brush Script MT, cursive' }}>Dewangan shaddi.com</span>
            <div className="common_topRightNav__3KD5j">
                <button
                    data-testid="login_button"
                    className="common_login__2FLV3 css-ny049c"
                    style={{ color: 'deeppink', fontSize: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                    onClick={handleLoginClick}
                >
                    Login
                    <span className="css-jdisn5"></span>
                </button>
                <button
                    type="button"
                    className="common_help__1NOqB css-ny049c"
                    style={{ color: 'deeppink', fontSize: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                    onClick={handleHelpClick}

                >
                    Help
                    <span id="shaadiHelpIcon"  data-testid="help_icon" className="css-ygjqul"></span>
                    <span id="shaadiHelpArrow"  data-testid="help_arrow" className="css-jdisn5"></span>


                </button>
            </div>
            {showLoginModal && (
                <div className="modal show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="mobileEmailInput" className="form-label">Mobile No. / Email ID:</label>
                                    <input type="text" className="form-control" id="mobileEmailInput" value={mobileEmail} onChange={handleMobileEmailChange} placeholder="Enter your mobile number or email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordInput" className="form-label">Password:</label>
                                    <input type="password" className="form-control" id="passwordInput" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleForgotPasswordClick}>Forgot Password?</button>
                                <button type="button" className="btn btn-primary" onClick={handleLoginSubmit}>Login</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showHelpModal && (
                <div className="modal show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>India : +91 7000186765</p>
                                <p>For regional offices click <a href="https://intallyshwisdom.com/">here</a></p>
                                <p>You can now call us between 10am - 7pm (IST). For Instant Support, we recommend that you connect with us on Chat & we will be there to assist you.</p>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModalHelp}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;