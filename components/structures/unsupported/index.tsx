import { memo } from "react";
import { toYYYY } from "@/services/date";

export const Unsupported = memo(() => (
  <noscript>
    <div
      style={{
        position: "absolute",
        display: "flex !important",
        width: "100% !important",
        height: "100% !important",
        top: "0 !important",
        left: "0 !important",
        right: "0 !important",
        bottom: "0 !important",
        flexDirection: "column",
        backgroundColor: "#fff !important",
        color: "#372218 !important",
        zIndex: "9999 !important",
      }}
    >
      <div
        style={{
          flex: "1 !important",
          display: "flex !important",
          flexDirection: "column",
          justifyContent: "center !important",
        }}
      >
        <header
          style={{
            width: "100% !important",
            borderBottom: "1px solid #cccccc !important",
            backgroundColor: "#fff !important",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05) !important",
          }}
        >
          <div
            style={{
              marginLeft: "auto !important",
              marginRight: "auto !important",
              display: "flex !important",
              height: "3.5rem !important",
              width: "100% !important",
              maxWidth: "80rem !important",
              alignItems: "center !important",
              justifyContent: "space-between !important",
              padding: "0 1rem !important",
            }}
          >
            <div
              style={{
                display: "flex !important",
                alignItems: "center !important",
                gap: "0.5rem !important",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#372218"
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  strokeWidth: "2",
                  fill: "rgba(150, 55, 28, 0.15)",
                }}
              >
                <title>おうちずかん</title>
                <g strokeWidth="0" />
                <g strokeLinecap="round" strokeLinejoin="round" />
                <g>
                  <path d="M1.48,23.5V20.63a6.7,6.7,0,0,1,6.69-6.7h5.74a1.92,1.92,0,0,1,1.92,1.92h0a1.92,1.92,0,0,1-1.92,1.91h1l4.19-4.19A2,2,0,0,1,20.49,13h0a2,2,0,0,1,2,2h0a2,2,0,0,1-.59,1.43l-4,4a3.84,3.84,0,0,1-2.7,1.12H11A1.91,1.91,0,0,0,9.13,23.5h0" />
                  <rect x="7.22" y="7.03" width="9.57" height="6.91" />
                  <polygon points="12 1.5 6.26 7.03 17.74 7.03 12 1.5" />
                  <rect x="11.04" y="11.07" width="1.91" height="2.87" />
                </g>
              </svg>
              <span
                style={{
                  fontWeight: "bold !important",
                  fontSize: "1.125rem !important",
                  color: "#372218 !important",
                  letterSpacing: "0.05em !important",
                }}
              >
                おうちずかん
              </span>
            </div>
          </div>
        </header>

        <main
          style={{
            position: "relative",
            marginLeft: "auto !important",
            marginRight: "auto !important",
            width: "100% !important",
            maxWidth: "80rem !important",
            flex: "1 !important",
            padding: "1rem !important",
          }}
        >
          <div
            style={{
              display: "flex !important",
              flexDirection: "column",
              gap: "1rem !important",
            }}
          >
            <h1
              style={{
                padding: "0 !important",
                margin: "0 !important",
                fontSize: "1.875rem !important",
                lineHeight: "2.25rem !important",
                fontWeight: "800 !important",
                color: "#372218 !important",
              }}
            >
              あれれ...
            </h1>
            <div
              style={{
                fontSize: "1rem !important",
                color: "#5c4632 !important",
                lineHeight: "1.5rem !important",
              }}
            >
              <p>準備が整っていないようです。</p>
            </div>
          </div>
        </main>

        <footer
          style={{
            width: "100% !important",
            borderTop: "1px solid #cccccc !important",
            backgroundColor: "#fff !important",
            boxShadow: "0 -1px 2px 0 rgba(0, 0, 0, 0.05) !important",
            paddingBottom: "0px !important",
          }}
        >
          <div
            style={{
              display: "flex !important",
              alignItems: "center !important",
              justifyContent: "center !important",
              gap: "0.25rem !important",
              textAlign: "center",
              color: "#5c4632 !important",
              fontSize: "0.75rem !important",
              padding: "0.5rem !important",
            }}
          >
            <span>© {toYYYY()}</span>
            <span>おうちずかん</span>
          </div>
        </footer>
      </div>
    </div>
  </noscript>
));

Unsupported.displayName = "Unsupported";
