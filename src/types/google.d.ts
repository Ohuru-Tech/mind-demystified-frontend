export {};

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
            use_fedcm_for_button?: boolean;
            button_auto_select?: boolean;
            auto_select?: boolean;
            ux_mode?: "popup" | "redirect";
          }) => void;
          renderButton: (
            element: HTMLElement,
            options?: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "rounded" | "circle" | "square";
              logo_alignment?: "left" | "center";
              width?: string;
              locale?: string;
              click_listener?: () => void;
            }
          ) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
          storeCredential: (credential: any, callback?: () => void) => void;
          cancel: () => void;
          revoke: (hint: string, callback?: () => void) => void;
        };
      };
    };
  }
}
