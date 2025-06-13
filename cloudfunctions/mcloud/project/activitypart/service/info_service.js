/**
 * Notes: 活动模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2025-06-23 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const InfoModel = require('../model/info_model.js');

class InfoService extends BaseProjectService {

	// 更新forms信息
	async updateInfoForms({
		id,
		hasImageForms
	}) {
		await InfoModel.editForms(id, 'INFO_FORMS', 'INFO_OBJ', hasImageForms);
	}

	/**添加数据 */
	async insertInfo(

	) {


		this.AppError('[党群]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/**更新数据 */
	async editInfo(

	) {


		this.AppError('[党群]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	async getInfoList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'INFO_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			INFO_REPLY_SHOW: 1,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'INFO_OBJ.desc': ['like', search] },
			];
		} else if (sortType) {
			// 搜索菜单
			switch (sortType) {
				case 'type': {
					where.and['INFO_OBJ.type'] = String(sortVal);
					break;
				}
				case 'status': {
					where.and.INFO_STATUS = Number(sortVal);
					break;
				}
				case 'timedesc': { //按时间倒序
					orderBy = {
						'info.INFO_START': 'desc',
						'INFO_ADD_TIME': 'desc'
					};
					break;
				}
				case 'timeasc': { //按时间正序
					orderBy = {
						'info.INFO_START': 'asc',
						'INFO_ADD_TIME': 'asc'
					};
					break;
				}
			}
		}

		let result = await InfoModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

	/** 取得我的分页列表 */
	async getMyInfoList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'INFO_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			INFO_USER_ID: userId,
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ 'INFO_OBJ.desc': ['like', search] },
			];
		} else if (sortType) {
			// 搜索菜单
			switch (sortType) {
				case 'type': {
					where.and['INFO_OBJ.type'] = String(sortVal);
					break;
				}
				case 'status': {
					where.and.INFO_STATUS = Number(sortVal);
					break;
				}
				case 'timedesc': { //按时间倒序
					orderBy = {
						'info.INFO_START': 'desc',
						'INFO_ADD_TIME': 'desc'
					};
					break;
				}
				case 'timeasc': { //按时间正序
					orderBy = {
						'info.INFO_START': 'asc',
						'INFO_ADD_TIME': 'asc'
					};
					break;
				}
			}
		}

		let result = await InfoModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

	/** 取得我的详情 */
	async getMyInfoDetail(userId, infoId) {

		let fields = '*';

		let where = {
			_id: infoId,
			INFO_USER_ID: userId
		};
		return await InfoModel.getOne(where, fields);
	}


	async delMyInfo(userId, id) {
		let where = {
			_id: id
		}

		// for admin
		if (userId) where.INFO_USER_ID = userId;

		let info = await InfoModel.getOne(id);
		if (!info) return;

		// 异步处理 新旧文件
		cloudUtil.handlerCloudFilesForForms(info.INFO_FORMS, []);

		await InfoModel.del(where);
	}

}

module.exports = InfoService;