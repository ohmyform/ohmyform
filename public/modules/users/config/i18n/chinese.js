'use strict';

angular.module('users').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('cn', {
		ACCESS_DENIED_TEXT: '要访问此页面，你必须登录',
		USERNAME_OR_EMAIL_LABEL: '用户名或电子邮件地址',
		USERNAME_LABEL: '用户名',
		PASSWORD_LABEL: '密码',
		CURRENT_PASSWORD_LABEL: '目前的密码',
		NEW_PASSWORD_LABEL: '新密码',
		VERIFY_PASSWORD_LABEL: '验证密码',
		UPDATE_PASSWORD_LABEL: '更新密码',
		FIRST_NAME_LABEL: '名',
		LAST_NAME_LABEL: '姓',
		LANGUAGE_LABEL: '语言',
		EMAIL_LABEL: '电子邮件',

		SIGNUP_ACCOUNT_LINK: '还没有账号？在这里注册',
		SIGN_IN_ACCOUNT_LINK: '已经有帐号了？在这里登录',
		SIGNUP_HEADER_TEXT: '注册',
		SIGNIN_HEADER_TEXT: '登录',

		SIGNUP_ERROR_TEXT: '由于错误，无法注册用户',
		ENTER_ACCOUNT_EMAIL: '输入你的电子邮件地址',
		RESEND_VERIFICATION_EMAIL: '重新发送验证邮件',
		SAVE_CHANGES: '保存设置',
		CANCEL_BTN: '取消',

		EDIT_PROFILE: '编辑个人信息',
		UPDATE_PROFILE_BTN: '更新个人信息',
		PROFILE_SAVE_SUCCESS: '个人信息保存成功',
		PROFILE_SAVE_ERROR: '无法保存个人信息',
		CONNECTED_SOCIAL_ACCOUNTS: '绑定的社交帐号',
		CONNECT_OTHER_SOCIAL_ACCOUNTS: '绑定其他社交帐号',

		FORGOT_PASSWORD_LINK: '忘记密码了？',
		REVERIFY_ACCOUNT_LINK: '重新发送验证邮件',

		SIGNIN_BTN: '登录',
		SIGNUP_BTN: '注册',
		SAVE_PASSWORD_BTN: '记住密码',

		SUCCESS_HEADER: '登录成功',
		SUCCESS_TEXT: '你已经成功地在OhMyForm注册了账号',
		VERIFICATION_EMAIL_SENT: '验证邮件已发送',
		VERIFICATION_EMAIL_SENT_TO: '一封验证邮件已经发送到了：',
		NOT_ACTIVATED_YET: '但你的账号尚未激活',
		BEFORE_YOU_CONTINUE: '继续之前，请检查你的邮箱是否有我们发送的确认邮件。如果你没有在24小时内收到，请联系我们：',
		CHECK_YOUR_EMAIL: '检查你的电子邮箱并点击激活链接来激活你的账号，如果有任何问题，请联系:',
		CONTINUE: '继续',

		PASSWORD_RESTORE_HEADER: '找回密码',
		ENTER_YOUR_EMAIL: '输入电子邮件地址',
		SUBMIT_BTN: '提交',

		ASK_FOR_NEW_PASSWORD: '请求重置新密码',
		PASSWORD_RESET_INVALID: '密码重置链接无效',
		PASSWORD_RESET_SUCCESS: '密码已成功重置',
		PASSWORD_CHANGE_SUCCESS: '密码已成功更改',
		RESET_PASSWORD: '重置密码',
		CHANGE_PASSWORD: '更改密码',

		CONTINUE_TO_LOGIN: '前往登录页面',

		VERIFY_SUCCESS: '账号已成功激活',
		VERIFY_ERROR: '确认链接无效或已过期',
		ERROR: '错误'
	});
}]);
