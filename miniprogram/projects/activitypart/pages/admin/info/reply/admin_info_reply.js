const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../../helper/time_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const validate = require('../../../../../../helper/validate.js');
const AdminInfoBiz = require('../../../../biz/admin_info_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		formReply: '',
		formReplyShow: 1
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;
		if (!pageHelper.getOptions(this, options)) return;
		if (!pageHelper.getOptions(this, options, 'idx')) return;


		this._loadDetail();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	model: function (e) {
		pageHelper.model(this, e);
	},

	bindShowCmpt: function (e) {
		this.setData({ formReplyShow: e.detail });
	},

	_loadDetail: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let parent = pageHelper.getPrevPage(2);
		if (!parent) return;

		let info = parent.data.dataList.list[this.data.idx];

		this.setData({
			isLoad: true,
			info,
			formReply: info.INFO_REPLY,
			formReplyShow: info.INFO_REPLY_SHOW

		});
	},


	/** 
	 * 数据提交
	 */
	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		let parent = pageHelper.getPrevPage(2);
		if (!parent) return;

		// 数据校验
		let data = this.data;


		let CHECK_FORM = {
			reply: 'formReply|must|name=答复内容',
			replyShow: 'formReplyShow|must|int|name=是否展示',
		};
		data = validate.check(data, CHECK_FORM, this);
		if (!data) return;

		try {
			data.id = this.data.id;


			await cloudHelper.callCloudSumbit('admin/info_reply', data).then(res => {
				let callback = async () => {
					let idx = this.data.idx;
					parent.setData({
						['dataList.list[' + idx + '].INFO_STATUS']: 1,
						['dataList.list[' + idx + '].INFO_REPLY']: data.reply,
						['dataList.list[' + idx + '].INFO_REPLY_SHOW']: data.replyShow,
						['dataList.list[' + idx + '].INFO_REPLY_TIME']: timeHelper.time('Y-M-D h:m:s')
					});

					wx.navigateBack();

				}
				pageHelper.showSuccToast('答复成功', 2000, callback);
			});

		} catch (err) {
			console.log(err);
		}

	},


	url: function (e) {
		pageHelper.url(e, this);
	}

})