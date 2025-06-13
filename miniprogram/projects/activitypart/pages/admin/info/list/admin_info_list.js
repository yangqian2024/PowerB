const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js');
const InfoBiz = require('../../../../biz/info_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		if (options && options.search) {
			this.setData({ search: options.search });
		}

		//设置搜索菜单
		this._getSearchMenu();
	},



	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	bindOpenMapTap: function (e) {
		let address = pageHelper.dataset(e, 'address');
		let geo = pageHelper.dataset(e, 'geo');
		InfoBiz.openMap(address, geo);
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () { },

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

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},

	bindDelTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');

		let params = {
			id
		}

		let callback = async () => {
			try {
				let opts = {
					title: '删除中'
				}
				await cloudHelper.callCloudSumbit('admin/info_del', params, opts).then(res => {
					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('删除成功');
				});
			} catch (e) {
				console.log(e);
			}
		}
		pageHelper.showConfirm('确认删除？删除不可恢复', callback);

	},


	bindStatusTap: async function (e) {
		if (!AdminBiz.isAdmin(this)) return;
		let id = pageHelper.dataset(e, 'id');
		let idx = pageHelper.dataset(e, 'idx');
		let status = Number(pageHelper.dataset(e, 'status'));
		let params = {
			id,
			status
		}

		let cb = async () => {
			try {
				await cloudHelper.callCloudSumbit('admin/info_status', params).then(res => {
					this.setData({
						['dataList.list[' + idx + '].INFO_STATUS']: status,
						['dataList.list[' + idx + '].INFO_REPLY']: '',
					});
					pageHelper.showSuccToast('设置成功');
				});
			} catch (e) {
				console.log(e);
			}
		}

		pageHelper.showConfirm('确认执行此操作？', cb);

	},

	_getSearchMenu: function () {


		let cateIdOptions = InfoBiz.getCateList();

		let sortItem1 = [{ label: '分类', type: '', value: 0 }];
		sortItem1 = sortItem1.concat(cateIdOptions);



		let sortItems = [];
		if (sortItem1.length > 2) sortItems.push(sortItem1);

		let sortMenus = [
			{ label: '全部', type: '', value: '' },
			{ label: '待答复', type: 'status', value: 0 },
			{ label: '已答复', type: 'status', value: 1 },
			{ label: '时间△', type: 'sort', value: 'INFO_ADD_TIME|asc' },
			{ label: '时间▽', type: 'sort', value: 'INFO_ADD_TIME|desc' },
			{ label: '公开', type: 'show', value: 1 },
			{ label: '不公开', type: 'show', value: 0 },
		]

		let sortItems2 = [
			{ label: '类型', type: '', value: '' },
			{ label: '建议', type: 'type', value: '建议' },
			{ label: '意见', type: 'type', value: '意见' },
			{ label: '举报', type: 'type', value: '举报' },
		];
		sortItems.push(sortItems2);

		this.setData({
			search: '',
			cateIdOptions,
			sortItems,
			sortMenus,
			isLoad: true
		})

	},

})