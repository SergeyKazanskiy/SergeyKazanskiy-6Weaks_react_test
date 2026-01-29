import { LoginFormModel } from '../../auth/shared/model'


export function loginEmailTemplate(data: LoginFormModel) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <h2>🔐 Login form submission</h2>

      <table cellpadding="6">
        <tr>
          <td><b>Email:</b></td>
          <td>${data.email}</td>
        </tr>
        <tr>
          <td><b>Name:</b></td>
          <td>${data.name}</td>
        <tr>
          <td><b>Description:</b></td>
          <td>${data.comment ?? 'Empty'}</td>
        </tr>
      </table>

      <hr />
      <small>Next.js Email Service</small>
    </div>
  `
}
