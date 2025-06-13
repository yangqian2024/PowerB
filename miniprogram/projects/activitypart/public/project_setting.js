module.exports = { //activitypart
	PROJECT_COLOR: '#E72920',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#E72920',


	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=昵称',
		mobile: 'formMobile|must|mobile|name=手机',
		pic: 'formPic|must|string|name=头像',
		forms: 'formForms|array'
	},


	NEWS_NAME: '公告通知',
	NEWS_CATE: [
		{ id: 1, title: '公告通知' },
		{ id: 2, title: '社区风采' },

	],
	NEWS_FIELDS: [
	],

	ACTIVITY_NAME: '活动',
	ACTIVITY_CATE: [
		{ id: 1, title: '志愿者活动' },
		{ id: 2, title: '文化活动' },
		{ id: 3, title: '艺术活动' },
		{ id: 4, title: '体育活动' },
		{ id: 5, title: '公益活动' },
		{ id: 6, title: '其他' },
	],
	ACTIVITY_FIELDS: [
		{ mark: 'time', title: '预计时长(小时)', type: 'digit', must: true },
		{ mark: 'fee', title: '活动费用', type: 'text', must: true },
		{ mark: 'desc', title: '活动内容', type: 'content', must: true },
		{ mark: 'cover', title: '活动封面', type: 'image', min: 1, max: 8, must: true }, 
	],
	ACTIVITY_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, max: 30 },
		{ mark: 'phone', type: 'mobile', title: '手机', must: true, edit: false }
	],


	COMMENT_NAME: '评价',
	COMMENT_FIELDS: [
		{ mark: 'content', title: '评价内容', type: 'textarea', must: true },
		{ mark: 'img', title: '图片', type: 'image', min: 0, max: 8, must: false },

	],

	PRODUCT_NAME: '学习课堂',
	PRODUCT_CATE: [ 
		{ id: 1, title: '党群园地' },
		{ id: 2, title: '文史学习' },
		{ id: 3, title: '社区规章' },
		{ id: 4, title: '安全常识' },
	],
	PRODUCT_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', len: 1, must: true },
		{ mark: 'desc', title: '简介', type: 'textarea', must: true, max: 100 },
		{ mark: 'content', title: '详情', type: 'content', must: true },
	],

	ENROLL_NAME: '打卡',
	ENROLL_CATE: [
		{ id: 1, title: '打卡' },
	],
	ENROLL_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', len: 1, must: true },
		{ mark: 'desc', title: '简介', type: 'text', max: 50, must: true },
		{ mark: 'content', title: '详情介绍', type: 'content', must: true },

	],
	ENROLL_JOIN_FIELDS: [
		{ mark: 'content', title: '打卡内容', type: 'textarea', must: true },
		{ mark: 'img', title: '图片', type: 'image', min: 0, max: 8, must: false },
	],

	INFO_NAME: '反馈',
	INFO_CATE: [
		{ id: 1, title: '反馈', style: 'leftbig1' },
	],
	INFO_FIELDS: [
		{ mark: 'name', title: '姓名', type: 'text', must: true },
		{ mark: 'phone', title: '联系手机', type: 'mobile', must: true },
		{ mark: 'type', title: '类别', type: 'select', selectOptions: ['建议', '意见', '举报'], must: true },
		{ mark: 'desc', title: '内容', type: 'textarea', must: true },
		{ mark: 'img', title: '图片', type: 'image', must: false },
	],
}