// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import QRcode from "qrcode.react";

import { AuthnzStateTypes } from "../../constants";
import { login, mfa, totpSetup } from "../../utils/authnz";
import { authnzShowPasswordEntry } from "../../actions";
import type { Token } from "../../types";
import type { AuthnzState } from "../../reducers/authnz";
import type { AfterLoginFunc } from "../../utils/authnz";

import "./style.sass";

type State = {
  authnz: AuthnzState,
};

type OwnProps = {||};

type StateProps = {|
  loginButtonIsDisabled: boolean,
  state: string, // from AuthnzStateTypes
  totpURI: ?string,
  afterLogin: AfterLoginFunc,
|};

type DispatchProps = {|
  action: (string, AfterLoginFunc) => (e: SyntheticEvent<HTMLFormElement>) => mixed,
|};

type Props = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|};

class Auth extends Component<Props> {
  render() {
    let disabled = false;
    let disabledClass = "";
    const actionDisplay = "";
    let text = "Next";
    if (this.props.state == AuthnzStateTypes.SHOW_PASSWORD_ENTRY) {
      text = "Login";
    }
    if (this.props.state == AuthnzStateTypes.SHOW_TOTP_ENTRY) {
      text = "Login";
    }
    if (this.props.state == AuthnzStateTypes.SHOW_TOTP_SETUP) {
      text = "Finish";
    }

    let onSubmit = this.props.action(this.props.state, this.props.afterLogin);
    if (this.props.loginButtonIsDisabled) {
      disabled = true;
      disabledClass = "disabled";
      text = "Wait...";
      onSubmit = function() {
        return false;
      };
    }

    const actionButton = (
      <button className={`dark-bg ${disabledClass} ${actionDisplay}`} disabled={disabled}>
        {text}
      </button>
    );

    let emailDisplay = "";
    if (this.props.state != AuthnzStateTypes.SHOW_EMAIL_ENTRY) {
      emailDisplay = "hidden";
    }

    let passwordDisplay = "";
    if (this.props.state != AuthnzStateTypes.SHOW_PASSWORD_ENTRY) {
      passwordDisplay = "hidden";
    }

    let totpEntryDisplay = "";
    if (this.props.state != AuthnzStateTypes.SHOW_TOTP_ENTRY) {
      totpEntryDisplay = "hidden";
    }

    let totpSetupDisplay = "";
    let qrCode;
    if (this.props.state != AuthnzStateTypes.SHOW_TOTP_SETUP) {
      totpSetupDisplay = "hidden";
    } else {
      qrCode = <QRcode value={this.props.totpURI} size={120} />;
    }

    return (
      <div className="login-form">
        <form onSubmit={onSubmit}>

          <div className={`form-group ${emailDisplay}`}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input className="form-control" name="email" placeholder="Email Address" />
            </div>
          </div>

          <div className={`form-group ${passwordDisplay}`}>
            <div className="form-group">
              <label htmlFor="email">Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" />
            </div>
          </div>

          <div className={`form-group ${totpEntryDisplay}`}>
            <div className="form-group">
              <label htmlFor="mfa_number">MFA Number</label>
              <input className="form-control" name="mfa_number" autoComplete="off" placeholder="MFA Number, 000 000" />
            </div>
          </div>

          <div className={`form-group totp-instructions ${totpSetupDisplay}`}>
            <div className="form-group">
              <h2>Multi-Factor Authentication</h2>
              <p>
                Multi-Factor authentication is a technique to improve the security of your password. Multi-factor authentication has been
                enabled for your account and is required to access Capital Rx systems. Please follow the instructions below and contact
                support if you need any assistance.
              </p>
              <div className="totp-side-by-side">
                <div className={`qr-code ${totpSetupDisplay}`}>{qrCode}</div>
                <div>
                  <h3>Instructions:</h3>
                  <ol>
                    <li>Install the Google Authenticator App on your phone</li>
                    <li>Scan the QR Code</li>
                    <li>Enter the first MFA number that you see</li>
                    <li>Enter the next MFA number that you see</li>
                    <li>Click &apos;Finish&apos;</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className={`form-group ${totpSetupDisplay}`}>
            <div className="form-group">
              <input className="form-control" name="mfa_number_1" autoComplete="off" placeholder="1st MFA Number, 000 000" />
            </div>
          </div>

          <div className={`form-group ${totpSetupDisplay}`}>
            <div className="form-group">
              <input className="form-control" name="mfa_number_2" autoComplete="off" placeholder="2nd MFA Number, 000 000" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group submit-button">{actionButton}</div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: State): StateProps {
  const afterLogin: AfterLoginFunc = (token: Token) => {
    alert("FIX ME");
  };

  return {
    state: state.authnz.state,
    loginButtonIsDisabled: state.authnz.loginButtonIsDisabled,
    totpURI: state.authnz.totpURI,
    afterLogin: afterLogin,
  };
}

function mapDispatchToProps(dispatch) {
  const action = (state, afterLogin) => {
    const proceedFromEmail = (e) => {
      e.preventDefault();

      return dispatch(authnzShowPasswordEntry());
    };

    const getValue = (target: HTMLFormElement, name: string): string => {
      for (const elem of target.elements) {
        if (elem instanceof HTMLInputElement && elem.name === name) {
          return elem.value;
        }
      }

      return "";
    };

    const proceedFromPassword = (e) => {
      e.preventDefault();

      const email = getValue(e.currentTarget, "email");
      const password = getValue(e.currentTarget, "password");

      return mfa(dispatch, email, password, afterLogin);
    };

    const proceedFromTOTPEntry = (e) => {
      e.preventDefault();

      const email = getValue(e.currentTarget, "email");
      const password = getValue(e.currentTarget, "password");
      const mfaNumber = getValue(e.currentTarget, "mfa_number");

      return login(dispatch, email, password, afterLogin, mfaNumber);
    };

    const proceedFromTOTPSetup = (e) => {
      e.preventDefault();

      const email = getValue(e.currentTarget, "email");
      const password = getValue(e.currentTarget, "password");
      const mfaNumber1 = getValue(e.currentTarget, "mfa_number_1");
      const mfaNumber2 = getValue(e.currentTarget, "mfa_number_2");

      return totpSetup(dispatch, email, password, afterLogin, mfaNumber1, mfaNumber2);
    };

    let chosen;
    if (state === AuthnzStateTypes.SHOW_EMAIL_ENTRY) {
      chosen = proceedFromEmail;
    } else if (state === AuthnzStateTypes.SHOW_PASSWORD_ENTRY) {
      chosen = proceedFromPassword;
    } else if (state === AuthnzStateTypes.SHOW_TOTP_ENTRY) {
      chosen = proceedFromTOTPEntry;
    } else if (state === AuthnzStateTypes.SHOW_TOTP_SETUP) {
      chosen = proceedFromTOTPSetup;
    } else {
      chosen = (e) => {
        e.preventDefault();
      };
    }

    return chosen;
  };

  return {
    action: action,
  };
}

export default connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
