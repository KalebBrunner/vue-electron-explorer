/* eslint-disable no-unused-vars */
// var log = new Proxy({}, {
//   get: (x, k) => (...pass: any[]) => {
//     let pass_ = pass[0]; if (pass.length > 1) {
//       pass_ = JSON.stringify(pass);
//     }

const log = new Proxy<Record<string, (...args: any[]) => void>>(
  {},
  {
    get: (_target, prop) => {
      // Ensure prop is a string
      var k = String(prop);

      return (...pass: any[]) => {
        let pass_ = pass[0];
        if (pass.length > 1) {
          pass_ = JSON.stringify(pass);
        }

        switch (k) {
          case "error":
            console.error(pass_);
            break;
          case "warn":
            console.warn(pass_);
            break;
          case "info":
            console.info(pass_);
            break;
          case "debug":
            console.debug(pass_);
            break;
          case "assert":
            console.assert(pass[0], pass[1]);
            break;
          case "table":
            if (pass.length == 1) {
              console.table(pass[0]);
            } else {
              console.table(pass[0], pass[1]);
            }
            break;
          case "trace":
            console.trace();
            break;
          case "group":
            if (pass) {
              console.group(pass[0]);
            } else {
              console.group();
            }
            break;
          case "groupCollapsed":
            if (pass) {
              console.groupCollapsed(pass[0]);
            } else {
              console.groupCollapsed();
            }
            break;
          case "groupEnd":
            console.groupEnd();
            break;
          case "countReset":
            if (pass) {
              console.countReset(pass[0]);
            } else {
              console.countReset();
            }
            break;
          case "count":
            if (pass) {
              console.count(pass[0]);
            } else {
              console.count();
            }
            break;
          //   case "timeReset": if (pass) { console.timeReset(pass[0]); } else { console.timeReset(); } break;
          case "time":
            if (pass) {
              console.time(pass[0]);
            } else {
              console.time();
            }
            break;
          case "timeLog":
            if (pass) {
              console.timeLog(pass[0]);
            } else {
              console.timeLog();
            }
            break;
          case "clear":
            console.clear();
            console.log(`%c${pass.join(" ")}`, `color: ${k}`);
            break;
          case "dir":
            console.dir(`%c${pass.join(" ")}`);
            break;
          default:
            if (k === k.toLowerCase()) {
              let color = k;
              let backgroundColor = "transparent";
              if ("__blue.green".indexOf(k) > 0) {
                backgroundColor = k;
                color = "#fdffa3";
              }
              console.log(
                `%c${pass.join(" ")}`,
                `background-color: ${backgroundColor}; color: ${color}; padding: 0 4px;`
              );
            } else {
              let bold = " " + pass[0] + " ";
              if (pass.length > 1) {
                pass = pass.splice(1);
              }
              k = k.toLowerCase();
              let color = "white";
              let backgroundColor = k;
              if (
                "__yellow.red.wheat.pink,cyan,orange,purple,gray".indexOf(k) > 0
              ) {
                color = "black";
              }
              console.log(
                `%c${bold}`,
                `background-color: ${backgroundColor}; color: ${color}; font-weight: bold; font-size: 2rem`
              );
            }
            break;
        }
      };
    },
  }
);

export { log };
