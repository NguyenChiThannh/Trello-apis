export const customMail= (title, content, magicLink, code) => {
  return `<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <body style="background-color:#ffffff;margin:0 auto;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:0px 20px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
            </table>
            <h1 style="color:#1d1c1d;font-size:36px;font-weight:700;margin:30px 0;padding:0;line-height:42px">${title}</h1>
            <p style="font-size:20px;line-height:28px;margin:16px 0;margin-bottom:30px">${content}</p>
            ${magicLink !== undefined ? `<a style="text-align:center;vertical-align:middle; margin:16px 0;" href="${magicLink}">Verify account</a>`: ''} 
            ${code !== undefined ? `
              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:rgb(245, 244, 245);border-radius:4px;margin-bottom:30px;padding:40px 10px">
                <tbody>
                  <tr>
                    <td>
                      <p style="font-size:30px;line-height:24px;margin:16px 0;text-align:center;vertical-align:middle;letter-spacing: 8px;">${code}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            ` : ''}
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:#000">The confirmation code is valid within <strong>10 minutes</strong></p>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:#000">If you didn&#x27;t request this email, there&#x27;s nothing to worry about, you can safely ignore it.</p>
  </body>

</html>`
}
