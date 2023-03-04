import Upbond, { UPBOND_BUILD_ENV } from "@upbond/upbond-embed";
import Web3 from "web3";
import Web3Token from "web3-token";
import { ethers } from "ethers";
import { network } from "../config/network";
import { toast } from 'react-toastify'

class UpbondEmbed {
  // Initials
  upbond = new Upbond() || null;

  web3 = new Web3() || null;

  provider: any;

  isLoggedIn = false;

  initialized = false;

  networks = network;

  constructor() {
    this.upbond = new Upbond({
      buttonPosition: 'bottom-left',
      consentConfiguration: {
        clientId: `${process.env.NEXT_PUBLIC_DID_CLIENT_ID}`,
        secretKey: `${process.env.NEXT_PUBLIC_DID_SECRET_KEY}`,
        scope: ['email', 'name', 'birthday']
      },
      enableConsent: true,
    });
    this.web3 = new Web3();
    this.provider = null;
  }

  async init() {
    if (this.upbond instanceof Upbond) {
      await this.upbond.init({
        widgetConfig: {
          showAfterLoggedIn: true,
          showBeforeLoggedIn: false
        },
        buildEnv: UPBOND_BUILD_ENV.DEVELOPMENT,
        network: this.networks,
        isUsingDirect: true,
        skipDialog: false,
        dappRedirectUri: window !== undefined ? `${window.location.origin}` : 'http://localhost:3000/',
        loginConfig: {
          "upbond-line": {
            name: "LINE",
            description: "LINE",
            typeOfLogin: "line",
            loginProvider: "upbond-line",
            jwtParameters: {
              domain: `${process.env.NEXT_PUBLIC_LOGIN_UPBOND_DOMAIN}`,
              connection: "line",
              client_id: `${process.env.NEXT_PUBLIC_LINE_CLIENT_ID}`,
              clientId: `${process.env.NEXT_PUBLIC_LINE_CLIENT_ID}`,
              scope: "openid email profile offline_access",
            },
            clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
            logo: "https://elvira.co.th/wp-content/uploads/2016/02/line-icon.png",
            showOnModal: true,
            showOnDesktop: true,
            showOnMobile: true,
            mainOption: true,
            priority: 1,
            buttonBgColor: "#289B2A",
            buttonTextColor: "#f3f3f3",
          } as any,
          "upbond-google": {
            name: "Google",
            description: "Google",
            typeOfLogin: "jwt",
            loginProvider: "upbond-google",
            jwtParameters: {
              domain: `${process.env.NEXT_PUBLIC_LOGIN_UPBOND_DOMAIN}`,
              connection: "line",
              client_id: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
              clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
              scope: "openid email profile offline_access",
            },
            clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1PJmT_THldF0n5APcmt9p10utgu6KSw4cH2fQ5Xhpw&s",
            buttonBgColor: "#000000",
            buttonTextColor: "#000000",
            showOnModal: true,
            showOnDesktop: true,
            showOnMobile: true,
            mainOption: true,
            priority: 2,
          } as any,
        },
        whiteLabel: {
          walletTheme: {
            lang: `${window.navigator.language}`,
            logo: "https://i.ibb.co/L6vHB5d/company-logo-sample.png",
            name: "Company",
            buttonLogo:
              "https://i.ibb.co/wBmybLc/company-button-logo-sample.png",
            isActive: true,
            modalColor: "#fffff",
            bgColor: "#4B68AE",
            bgColorHover: "#214999",
            textColor: "#f3f3f3",
            textColorHover: "#214999",
            upbondLogin: {
              globalBgColor: "#ffffff",
              globalTextColor: "#4B68AE",
            },
          } as any,
        },
      } as any);

      console.log("UPBOND Embed initialized!");
      this.initialized = true;
      this.provider = upbondServices.upbond.provider;
    }
  }

  async login() {
    try {
      if (this.upbond instanceof Upbond && this.web3 instanceof Web3) {
        const _provider = await this.upbond.login(); // login using upbond
        this.web3.setProvider(this.upbond.provider as any);
        const accounts = await this.web3.eth.getAccounts();
        this.provider = _provider;
        this.upbond.isLoggedIn = true

        return {
          msg: "success",
          data: _provider,
          accounts,
          // ... anything that you want to returns
        };
      }
    } catch (error) {
      const errors: any = error
      console.log(error, "@errorOnReactProject?");
      toast.error(errors.message || "Some error occured");
      return {
        msg: errors.message || "Failed to login",
        data: null,
      };
    }
  }

  async logout() {
    try {
      if (this.upbond instanceof Upbond) {
        await this.upbond.logout();
        await this.upbond.cleanUp();
        window.location.reload();
        this.upbond.isLoggedIn = false

        return {
          msg: "success",
          data: true,
        };
      }
    } catch (error) {
      const errors: any = error
      toast.error(errors || "Some error occured");
      return {
        msg: errors || "Failed to login",
        data: null,
      };
    }
  }

  async getUserInfo() {
    if (this.upbond instanceof Upbond) {
      try {
        const userInfo = await this.upbond.getUserInfo("");
        return userInfo;
      } catch (error) {
        const errors: any = error
        toast.error(errors.message || "Some error occured");
        throw new Error(errors);
      }
    }
  }

  async signTransaction(msg = "", account: string) {
    if (this.web3 instanceof Web3) {
      try {
        this.web3.setProvider(this.upbond.provider as any);
        const sign = await this.web3.eth.sign(msg, account);
        return sign;
      } catch (error) {
        const errors: any = error
        console.error(error);
        toast.error(errors || "Some error occured");
        return null;
      }
    }
  }

  async signWeb3Token(account: string) {
    try {
      const ether = new ethers.providers.Web3Provider(this.upbond.provider as any);
      const signer = await ether.getSigner(account);
      const sign = await Web3Token.sign(async (msg: any) => {
        if (this.web3 instanceof Web3) {
          return await signer.signMessage(msg);
        }
      }, {
        expires_in: '3 days',
        expiration_time: new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)),
        nonce: Math.ceil(Math.random() * 10)
      });
      return sign;
    } catch (error) {
      const errors: any = error
      toast.error(errors.message || "Some error occured");
      return;
    }
  }
}

const upbondServices = new UpbondEmbed();

export default upbondServices;
