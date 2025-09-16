/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const clients_module_1 = __webpack_require__(5);
const sellers_module_1 = __webpack_require__(28);
const meetings_module_1 = __webpack_require__(32);
const workers_module_1 = __webpack_require__(36);
const classifications_module_1 = __webpack_require__(42);
const seeds_module_1 = __webpack_require__(46);
const kpis_module_1 = __webpack_require__(58);
const auth_module_1 = __webpack_require__(67);
const health_module_1 = __webpack_require__(74);
const database_module_1 = __webpack_require__(47);
const config_2 = __webpack_require__(76);
const not_found_filter_1 = __webpack_require__(81);
const request_logger_middleware_1 = __webpack_require__(82);
const jwt_auth_guard_1 = __webpack_require__(19);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(request_logger_middleware_1.RequestLoggerMiddleware).forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
                load: [config_2.appConfig, config_2.databaseConfig, config_2.redisConfig, config_2.workersConfig],
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            health_module_1.HealthModule,
            clients_module_1.ClientsModule,
            sellers_module_1.SellersModule,
            meetings_module_1.MeetingsModule,
            workers_module_1.WorkersModule,
            classifications_module_1.ClassificationsModule,
            seeds_module_1.SeedsModule,
            kpis_module_1.KpisModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: not_found_filter_1.NotFoundFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientsModule = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const clients_service_1 = __webpack_require__(7);
const clients_controller_1 = __webpack_require__(13);
const client_model_1 = __webpack_require__(8);
let ClientsModule = class ClientsModule {
};
exports.ClientsModule = ClientsModule;
exports.ClientsModule = ClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([client_model_1.Client])],
        controllers: [clients_controller_1.ClientsController],
        providers: [clients_service_1.ClientsService],
        exports: [clients_service_1.ClientsService],
    })
], ClientsModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientsService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const client_model_1 = __webpack_require__(8);
let ClientsService = class ClientsService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = "id", sortOrder = "ASC", } = paginationDto;
        const offset = (page - 1) * limit;
        const { count, rows } = await this.clientModel.findAndCountAll({
            limit,
            offset,
            order: [[this.sanitizeColumn(sortBy), sortOrder]],
            raw: true,
        });
        return {
            clients: rows,
            total: count,
        };
    }
    async findOne(id) {
        const client = await this.clientModel.findByPk(id, { raw: true });
        if (!client) {
            throw new common_1.NotFoundException("Client not found");
        }
        return client;
    }
    async create(createClientDto) {
        try {
            const client = await this.clientModel.create({
                name: createClientDto.name,
                email: createClientDto.email || null,
                phone: createClientDto.phone || null,
            });
            return client.toJSON();
        }
        catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new common_1.BadRequestException("Email already exists");
            }
            throw new common_1.BadRequestException("Failed to create client");
        }
    }
    async update(id, updateClientDto) {
        const client = await this.clientModel.findByPk(id);
        if (!client) {
            throw new common_1.NotFoundException("Client not found");
        }
        try {
            const updateData = {};
            if (updateClientDto.name !== undefined)
                updateData.name = updateClientDto.name;
            if (updateClientDto.email !== undefined)
                updateData.email = updateClientDto.email;
            if (updateClientDto.phone !== undefined)
                updateData.phone = updateClientDto.phone;
            if (Object.keys(updateData).length === 0) {
                return client.toJSON();
            }
            await client.update(updateData);
            return client.toJSON();
        }
        catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new common_1.BadRequestException("Email already exists");
            }
            throw new common_1.BadRequestException("Failed to update client");
        }
    }
    async remove(id) {
        const client = await this.clientModel.findByPk(id);
        if (!client) {
            throw new common_1.NotFoundException("Client not found");
        }
        await client.destroy();
    }
    sanitizeColumn(column) {
        const allowedColumns = [
            "id",
            "name",
            "email",
            "phone",
            "created_at",
            "updated_at",
        ];
        return allowedColumns.includes(column) ? column : "id";
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __metadata("design:paramtypes", [Object])
], ClientsService);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Client = void 0;
const sequelize_typescript_1 = __webpack_require__(9);
const meeting_model_1 = __webpack_require__(10);
let Client = class Client extends sequelize_typescript_1.Model {
};
exports.Client = Client;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255],
        },
    }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true,
        },
    }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        validate: {
            len: [8, 15],
        },
    }),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Client.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Client.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => meeting_model_1.Meeting, { foreignKey: "client_id", as: "meetings" }),
    __metadata("design:type", Array)
], Client.prototype, "meetings", void 0);
exports.Client = Client = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "clients",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                fields: ["email"],
            },
            {
                fields: ["phone"],
            },
        ],
    })
], Client);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Meeting = void 0;
const sequelize_typescript_1 = __webpack_require__(9);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
const meeting_classification_model_1 = __webpack_require__(12);
let Meeting = class Meeting extends sequelize_typescript_1.Model {
};
exports.Meeting = Meeting;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Meeting.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => client_model_1.Client),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: "clients",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Number)
], Meeting.prototype, "client_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => seller_model_1.Seller),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: "sellers",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    }),
    __metadata("design:type", Number)
], Meeting.prototype, "seller_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            notEmpty: true,
        },
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Meeting.prototype, "meeting_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Meeting.prototype, "closed", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Meeting.prototype, "transcript", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Meeting.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Meeting.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => client_model_1.Client, { foreignKey: "client_id", as: "client" }),
    __metadata("design:type", typeof (_d = typeof client_model_1.Client !== "undefined" && client_model_1.Client) === "function" ? _d : Object)
], Meeting.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => seller_model_1.Seller, { foreignKey: "seller_id", as: "seller" }),
    __metadata("design:type", typeof (_e = typeof seller_model_1.Seller !== "undefined" && seller_model_1.Seller) === "function" ? _e : Object)
], Meeting.prototype, "seller", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => meeting_classification_model_1.MeetingClassification, {
        foreignKey: "meeting_id",
        as: "classifications",
    }),
    __metadata("design:type", Array)
], Meeting.prototype, "classifications", void 0);
exports.Meeting = Meeting = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "meetings",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                fields: ["client_id"],
            },
            {
                fields: ["seller_id"],
            },
            {
                fields: ["meeting_at"],
            },
            {
                fields: ["closed"],
            },
        ],
    })
], Meeting);


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Seller = void 0;
const sequelize_typescript_1 = __webpack_require__(9);
const meeting_model_1 = __webpack_require__(10);
let Seller = class Seller extends sequelize_typescript_1.Model {
};
exports.Seller = Seller;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Seller.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255],
        },
    }),
    __metadata("design:type", String)
], Seller.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    }),
    __metadata("design:type", String)
], Seller.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        validate: {
            len: [8, 15],
        },
    }),
    __metadata("design:type", String)
], Seller.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Seller.prototype, "active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        defaultValue: '',
    }),
    __metadata("design:type", String)
], Seller.prototype, "prompt", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Seller.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Seller.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => meeting_model_1.Meeting, { foreignKey: "seller_id", as: "meetings" }),
    __metadata("design:type", Array)
], Seller.prototype, "meetings", void 0);
exports.Seller = Seller = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "sellers",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                fields: ["email"],
            },
            {
                fields: ["active"],
            },
        ],
    })
], Seller);


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingClassification = void 0;
const sequelize_typescript_1 = __webpack_require__(9);
const meeting_model_1 = __webpack_require__(10);
let MeetingClassification = class MeetingClassification extends sequelize_typescript_1.Model {
};
exports.MeetingClassification = MeetingClassification;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], MeetingClassification.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => meeting_model_1.Meeting),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: "meetings",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Number)
], MeetingClassification.prototype, "meeting_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de BusinessSector basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "business_sector", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de CompanySize basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "company_size", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de Region basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de LeadSource basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "lead_source", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de VambeProduct basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "vambe_product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de UseCase basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "use_case", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de PrimaryPainPoint basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "primary_pain_point", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        comment: "Análisis de Urgency basado en la reunión",
    }),
    __metadata("design:type", Boolean)
], MeetingClassification.prototype, "urgency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de DecisionMakerRole basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "decision_maker_role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de PurchaseStage basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "purchase_stage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: "Análisis de Language basado en la reunión",
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "language", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        comment: "Cliente perdido por mala reunión",
    }),
    __metadata("design:type", Boolean)
], MeetingClassification.prototype, "lost_client_bad_meeting", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        defaultValue: [],
    }),
    __metadata("design:type", Array)
], MeetingClassification.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0.0,
    }),
    __metadata("design:type", Number)
], MeetingClassification.prototype, "confidence_score", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM("positive", "neutral", "negative"),
        allowNull: false,
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "sentiment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        defaultValue: [],
    }),
    __metadata("design:type", Array)
], MeetingClassification.prototype, "key_topics", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        defaultValue: [],
    }),
    __metadata("design:type", Array)
], MeetingClassification.prototype, "action_items", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "next_steps", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "summary", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "model_used", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MeetingClassification.prototype, "processed_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], MeetingClassification.prototype, "processing_time_ms", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], MeetingClassification.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], MeetingClassification.prototype, "updated_at", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => meeting_model_1.Meeting, { foreignKey: "meeting_id", as: "meeting" }),
    __metadata("design:type", typeof (_d = typeof meeting_model_1.Meeting !== "undefined" && meeting_model_1.Meeting) === "function" ? _d : Object)
], MeetingClassification.prototype, "meeting", void 0);
exports.MeetingClassification = MeetingClassification = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "meetings_classifications",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                unique: true,
                fields: ["meeting_id"],
                name: "meetings_classifications_meeting_id_unique",
            },
            {
                fields: ["processed_at"],
                name: "meetings_classifications_processed_at_index",
            },
        ],
    })
], MeetingClassification);


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientsController = void 0;
const common_1 = __webpack_require__(2);
const clients_service_1 = __webpack_require__(7);
const client_dto_1 = __webpack_require__(14);
const pagination_dto_1 = __webpack_require__(16);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async findAll(paginationDto) {
        const result = await this.clientsService.findAll(paginationDto);
        const response = {
            success: true,
            data: {
                clients: result.clients,
                pagination: {
                    page: paginationDto.page || 1,
                    limit: paginationDto.limit || 10,
                    total: result.total,
                    totalPages: Math.ceil(result.total / (paginationDto.limit || 10)),
                },
            },
            message: "Clients retrieved successfully",
        };
        return response;
    }
    async findOne(id) {
        const client = await this.clientsService.findOne(id);
        const response = {
            success: true,
            data: client,
            message: "Client retrieved successfully",
        };
        return response;
    }
    async create(createClientDto) {
        const client = await this.clientsService.create(createClientDto);
        const response = {
            success: true,
            data: client,
            message: "Client created successfully",
        };
        return response;
    }
    async update(id, updateClientDto) {
        const client = await this.clientsService.update(id, updateClientDto);
        const response = {
            success: true,
            data: client,
            message: "Client updated successfully",
        };
        return response;
    }
    async remove(id) {
        await this.clientsService.remove(id);
        const response = {
            success: true,
            message: "Client deleted successfully",
        };
        return response;
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof client_dto_1.CreateClientDto !== "undefined" && client_dto_1.CreateClientDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof client_dto_1.UpdateClientDto !== "undefined" && client_dto_1.UpdateClientDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ClientsController.prototype, "remove", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)("clients"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.ADMIN, user_model_1.UserRole.SUPER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _a : Object])
], ClientsController);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClientDto = exports.CreateClientDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateClientDto {
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateClientDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[+]?[\d\s\-\(\)]{8,15}$/, {
        message: "Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix",
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "phone", void 0);
class UpdateClientDto {
}
exports.UpdateClientDto = UpdateClientDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[+]?[\d\s\-\(\)]{8,15}$/, {
        message: "Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix",
    }),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "phone", void 0);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationDto = void 0;
const class_validator_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(17);
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = "id";
        this.sortOrder = "ASC";
    }
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaginationDto.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(["ASC", "DESC"]),
    __metadata("design:type", String)
], PaginationDto.prototype, "sortOrder", void 0);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = exports.JwtAuthGuard = void 0;
var jwt_auth_guard_1 = __webpack_require__(19);
Object.defineProperty(exports, "JwtAuthGuard", ({ enumerable: true, get: function () { return jwt_auth_guard_1.JwtAuthGuard; } }));
var roles_guard_1 = __webpack_require__(21);
Object.defineProperty(exports, "RolesGuard", ({ enumerable: true, get: function () { return roles_guard_1.RolesGuard; } }));


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(20);
const core_1 = __webpack_require__(1);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            throw new common_1.ForbiddenException('User not authenticated');
        }
        const hasRole = requiredRoles.some((role) => user.role === role);
        if (!hasRole) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = exports.Roles = exports.Public = void 0;
var public_decorator_1 = __webpack_require__(23);
Object.defineProperty(exports, "Public", ({ enumerable: true, get: function () { return public_decorator_1.Public; } }));
var roles_decorator_1 = __webpack_require__(24);
Object.defineProperty(exports, "Roles", ({ enumerable: true, get: function () { return roles_decorator_1.Roles; } }));
var current_user_decorator_1 = __webpack_require__(25);
Object.defineProperty(exports, "CurrentUser", ({ enumerable: true, get: function () { return current_user_decorator_1.CurrentUser; } }));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(2);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = exports.UserRole = void 0;
const sequelize_typescript_1 = __webpack_require__(9);
const bcrypt = __webpack_require__(27);
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "super_admin";
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User extends sequelize_typescript_1.Model {
    static async hashPassword(instance) {
        if (instance.changed('password')) {
            const saltRounds = 10;
            instance.password = await bcrypt.hash(instance.password, saltRounds);
        }
    }
    async validatePassword(password) {
        console.log(password);
        console.log(this.password);
        return bcrypt.compare(password, this.password);
    }
    toJSON() {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }
};
exports.User = User;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(255),
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "updated_at", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "hashPassword", null);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
            {
                unique: true,
                fields: ["email"],
                name: "users_email_unique",
            },
        ],
    })
], User);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellersModule = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const sellers_service_1 = __webpack_require__(29);
const sellers_controller_1 = __webpack_require__(30);
const seller_model_1 = __webpack_require__(11);
const meeting_model_1 = __webpack_require__(10);
let SellersModule = class SellersModule {
};
exports.SellersModule = SellersModule;
exports.SellersModule = SellersModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([seller_model_1.Seller, meeting_model_1.Meeting])],
        controllers: [sellers_controller_1.SellersController],
        providers: [sellers_service_1.SellersService],
        exports: [sellers_service_1.SellersService],
    })
], SellersModule);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellersService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const seller_model_1 = __webpack_require__(11);
const meeting_model_1 = __webpack_require__(10);
let SellersService = class SellersService {
    constructor(sellerModel, meetingModel) {
        this.sellerModel = sellerModel;
        this.meetingModel = meetingModel;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = "id", sortOrder = "ASC", } = paginationDto;
        const offset = (page - 1) * limit;
        const { count, rows } = await this.sellerModel.findAndCountAll({
            limit,
            offset,
            order: [[this.sanitizeColumn(sortBy), sortOrder]],
            raw: true,
        });
        return {
            sellers: rows,
            total: count,
        };
    }
    async findOne(id) {
        const seller = await this.sellerModel.findByPk(id, { raw: true });
        if (!seller) {
            throw new common_1.NotFoundException("Seller not found");
        }
        return seller;
    }
    async create(createSellerDto) {
        try {
            const seller = await this.sellerModel.create({
                name: createSellerDto.name,
                email: createSellerDto.email,
                phone: createSellerDto.phone || null,
                active: createSellerDto.active !== undefined ? createSellerDto.active : true,
                prompt: createSellerDto.prompt || '',
            });
            return seller.toJSON();
        }
        catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new common_1.BadRequestException("Email already exists");
            }
            throw new common_1.BadRequestException("Failed to create seller");
        }
    }
    async update(id, updateSellerDto) {
        const seller = await this.sellerModel.findByPk(id);
        if (!seller) {
            throw new common_1.NotFoundException("Seller not found");
        }
        try {
            const updateData = {};
            if (updateSellerDto.name !== undefined)
                updateData.name = updateSellerDto.name;
            if (updateSellerDto.email !== undefined)
                updateData.email = updateSellerDto.email;
            if (updateSellerDto.phone !== undefined)
                updateData.phone = updateSellerDto.phone;
            if (updateSellerDto.active !== undefined)
                updateData.active = updateSellerDto.active;
            if (updateSellerDto.prompt !== undefined)
                updateData.prompt = updateSellerDto.prompt;
            if (Object.keys(updateData).length === 0) {
                return seller.toJSON();
            }
            await seller.update(updateData);
            return seller.toJSON();
        }
        catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new common_1.BadRequestException("Email already exists");
            }
            throw new common_1.BadRequestException("Failed to update seller");
        }
    }
    async remove(id) {
        const seller = await this.sellerModel.findByPk(id, {
            include: [
                {
                    model: this.meetingModel,
                    as: "meetings",
                },
            ],
        });
        if (!seller) {
            throw new common_1.NotFoundException("Seller not found");
        }
        const meetingCount = seller.meetings?.length || 0;
        if (meetingCount > 0) {
            throw new common_1.BadRequestException("Cannot delete seller with associated meetings");
        }
        await seller.destroy();
    }
    async getActiveSellers() {
        const sellers = await this.sellerModel.findAll({
            where: { active: true },
            order: [["name", "ASC"]],
            raw: true,
        });
        return sellers;
    }
    sanitizeColumn(column) {
        const allowedColumns = [
            "id",
            "name",
            "email",
            "phone",
            "active",
            "prompt",
            "created_at",
            "updated_at",
        ];
        return allowedColumns.includes(column) ? column : "id";
    }
};
exports.SellersService = SellersService;
exports.SellersService = SellersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __param(1, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __metadata("design:paramtypes", [Object, Object])
], SellersService);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellersController = void 0;
const common_1 = __webpack_require__(2);
const sellers_service_1 = __webpack_require__(29);
const seller_dto_1 = __webpack_require__(31);
const pagination_dto_1 = __webpack_require__(16);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let SellersController = class SellersController {
    constructor(sellersService) {
        this.sellersService = sellersService;
    }
    async findAll(paginationDto) {
        const result = await this.sellersService.findAll(paginationDto);
        const response = {
            success: true,
            data: {
                sellers: result.sellers,
                pagination: {
                    page: paginationDto.page || 1,
                    limit: paginationDto.limit || 10,
                    total: result.total,
                    totalPages: Math.ceil(result.total / (paginationDto.limit || 10)),
                },
            },
            message: "Sellers retrieved successfully",
        };
        return response;
    }
    async findOne(id) {
        const seller = await this.sellersService.findOne(id);
        const response = {
            success: true,
            data: seller,
            message: "Seller retrieved successfully",
        };
        return response;
    }
    async create(createSellerDto) {
        const seller = await this.sellersService.create(createSellerDto);
        const response = {
            success: true,
            data: seller,
            message: "Seller created successfully",
        };
        return response;
    }
    async update(id, updateSellerDto) {
        const seller = await this.sellersService.update(id, updateSellerDto);
        const response = {
            success: true,
            data: seller,
            message: "Seller updated successfully",
        };
        return response;
    }
    async remove(id) {
        await this.sellersService.remove(id);
        const response = {
            success: true,
            message: "Seller deleted successfully",
        };
        return response;
    }
    async getActiveSellers() {
        const sellers = await this.sellersService.getActiveSellers();
        const response = {
            success: true,
            data: sellers,
            message: "Active sellers retrieved successfully",
        };
        return response;
    }
};
exports.SellersController = SellersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SellersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], SellersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof seller_dto_1.CreateSellerDto !== "undefined" && seller_dto_1.CreateSellerDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], SellersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof seller_dto_1.UpdateSellerDto !== "undefined" && seller_dto_1.UpdateSellerDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], SellersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], SellersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)("active"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], SellersController.prototype, "getActiveSellers", null);
exports.SellersController = SellersController = __decorate([
    (0, common_1.Controller)("sellers"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.ADMIN, user_model_1.UserRole.SUPER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof sellers_service_1.SellersService !== "undefined" && sellers_service_1.SellersService) === "function" ? _a : Object])
], SellersController);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSellerDto = exports.CreateSellerDto = void 0;
const class_validator_1 = __webpack_require__(15);
class CreateSellerDto {
    constructor() {
        this.active = true;
        this.prompt = '';
    }
}
exports.CreateSellerDto = CreateSellerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[+]?[\d\s\-\(\)]{8,15}$/, {
        message: "Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix",
    }),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSellerDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "prompt", void 0);
class UpdateSellerDto {
}
exports.UpdateSellerDto = UpdateSellerDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateSellerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateSellerDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[+]?[\d\s\-\(\)]{8,15}$/, {
        message: "Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix",
    }),
    __metadata("design:type", String)
], UpdateSellerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSellerDto.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSellerDto.prototype, "prompt", void 0);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingsModule = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const meetings_service_1 = __webpack_require__(33);
const meetings_controller_1 = __webpack_require__(34);
const meeting_model_1 = __webpack_require__(10);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
let MeetingsModule = class MeetingsModule {
};
exports.MeetingsModule = MeetingsModule;
exports.MeetingsModule = MeetingsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([meeting_model_1.Meeting, client_model_1.Client, seller_model_1.Seller])],
        controllers: [meetings_controller_1.MeetingsController],
        providers: [meetings_service_1.MeetingsService],
        exports: [meetings_service_1.MeetingsService],
    })
], MeetingsModule);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingsService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const meeting_model_1 = __webpack_require__(10);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
let MeetingsService = class MeetingsService {
    constructor(meetingModel, clientModel, sellerModel) {
        this.meetingModel = meetingModel;
        this.clientModel = clientModel;
        this.sellerModel = sellerModel;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = "meeting_at", sortOrder = "DESC", client_id, seller_id, closed, } = paginationDto;
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (client_id)
            whereClause.client_id = client_id;
        if (seller_id)
            whereClause.seller_id = seller_id;
        if (closed !== undefined)
            whereClause.closed = closed;
        const { count, rows } = await this.meetingModel.findAndCountAll({
            where: whereClause,
            limit,
            offset,
            order: [[this.sanitizeColumn(sortBy), sortOrder]],
            include: [
                {
                    model: this.clientModel,
                    as: "client",
                    attributes: ["id", "name", "email", "phone"],
                },
                {
                    model: this.sellerModel,
                    as: "seller",
                    attributes: ["id", "name", "email", "phone", "active"],
                },
            ],
        });
        return {
            meetings: rows,
            total: count,
        };
    }
    async findOne(id) {
        const meeting = await this.meetingModel.findByPk(id, {
            include: [
                {
                    model: this.clientModel,
                    as: "client",
                    attributes: ["id", "name", "email", "phone"],
                },
                {
                    model: this.sellerModel,
                    as: "seller",
                    attributes: ["id", "name", "email", "phone", "active"],
                },
            ],
        });
        if (!meeting) {
            throw new common_1.NotFoundException("Meeting not found");
        }
        console.log(meeting.toJSON());
        return meeting.toJSON();
    }
    async create(createMeetingDto) {
        const client = await this.clientModel.findByPk(createMeetingDto.client_id);
        if (!client) {
            throw new common_1.BadRequestException("Client not found");
        }
        const seller = await this.sellerModel.findByPk(createMeetingDto.seller_id);
        if (!seller) {
            throw new common_1.BadRequestException("Seller not found");
        }
        try {
            const meeting = await this.meetingModel.create({
                client_id: createMeetingDto.client_id,
                seller_id: createMeetingDto.seller_id,
                meeting_at: new Date(createMeetingDto.meeting_at),
                transcript: createMeetingDto.transcript || null,
            });
            return meeting.toJSON();
        }
        catch (error) {
            throw new common_1.BadRequestException("Failed to create meeting");
        }
    }
    async update(id, updateMeetingDto) {
        const meeting = await this.meetingModel.findByPk(id);
        if (!meeting) {
            throw new common_1.NotFoundException("Meeting not found");
        }
        try {
            const updateData = {};
            if (updateMeetingDto.client_id !== undefined) {
                const client = await this.clientModel.findByPk(updateMeetingDto.client_id);
                if (!client) {
                    throw new common_1.BadRequestException("Client not found");
                }
                updateData.client_id = updateMeetingDto.client_id;
            }
            if (updateMeetingDto.seller_id !== undefined) {
                const seller = await this.sellerModel.findByPk(updateMeetingDto.seller_id);
                if (!seller) {
                    throw new common_1.BadRequestException("Seller not found");
                }
                updateData.seller_id = updateMeetingDto.seller_id;
            }
            if (updateMeetingDto.meeting_at !== undefined) {
                updateData.meeting_at = new Date(updateMeetingDto.meeting_at);
            }
            if (updateMeetingDto.closed !== undefined) {
                updateData.closed = updateMeetingDto.closed;
            }
            if (updateMeetingDto.transcript !== undefined) {
                updateData.transcript = updateMeetingDto.transcript;
            }
            if (Object.keys(updateData).length === 0) {
                return meeting.toJSON();
            }
            await meeting.update(updateData);
            return meeting.toJSON();
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException("Failed to update meeting");
        }
    }
    async remove(id) {
        const meeting = await this.meetingModel.findByPk(id);
        if (!meeting) {
            throw new common_1.NotFoundException("Meeting not found");
        }
        await meeting.destroy();
    }
    async closeMeeting(id) {
        return this.update(id, { closed: true });
    }
    sanitizeColumn(column) {
        const allowedColumns = [
            "id",
            "client_id",
            "seller_id",
            "meeting_at",
            "closed",
            "created_at",
            "updated_at",
        ];
        return allowedColumns.includes(column) ? column : "meeting_at";
    }
};
exports.MeetingsService = MeetingsService;
exports.MeetingsService = MeetingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(1, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __param(2, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __metadata("design:paramtypes", [Object, Object, Object])
], MeetingsService);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingsController = void 0;
const common_1 = __webpack_require__(2);
const meetings_service_1 = __webpack_require__(33);
const meeting_dto_1 = __webpack_require__(35);
const pagination_dto_1 = __webpack_require__(16);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let MeetingsController = class MeetingsController {
    constructor(meetingsService) {
        this.meetingsService = meetingsService;
    }
    async findAll(paginationDto, client_id, seller_id, closed) {
        const query = {
            ...paginationDto,
            client_id: client_id ? parseInt(client_id) : undefined,
            seller_id: seller_id ? parseInt(seller_id) : undefined,
            closed: closed ? closed === "true" : undefined,
        };
        const result = await this.meetingsService.findAll(query);
        const response = {
            success: true,
            data: {
                meetings: result.meetings,
                pagination: {
                    page: paginationDto.page || 1,
                    limit: paginationDto.limit || 10,
                    total: result.total,
                    totalPages: Math.ceil(result.total / (paginationDto.limit || 10)),
                },
            },
            message: "Meetings retrieved successfully",
        };
        return response;
    }
    async findOne(id) {
        const meeting = await this.meetingsService.findOne(id);
        const response = {
            success: true,
            data: meeting,
            message: "Meeting retrieved successfully",
        };
        return response;
    }
    async create(createMeetingDto) {
        const meeting = await this.meetingsService.create(createMeetingDto);
        const response = {
            success: true,
            data: meeting,
            message: "Meeting created successfully",
        };
        return response;
    }
    async update(id, updateMeetingDto) {
        const meeting = await this.meetingsService.update(id, updateMeetingDto);
        const response = {
            success: true,
            data: meeting,
            message: "Meeting updated successfully",
        };
        return response;
    }
    async remove(id) {
        await this.meetingsService.remove(id);
        const response = {
            success: true,
            message: "Meeting deleted successfully",
        };
        return response;
    }
    async closeMeeting(id) {
        const meeting = await this.meetingsService.closeMeeting(id);
        const response = {
            success: true,
            data: meeting,
            message: "Meeting closed successfully",
        };
        return response;
    }
};
exports.MeetingsController = MeetingsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)("client_id")),
    __param(2, (0, common_1.Query)("seller_id")),
    __param(3, (0, common_1.Query)("closed")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object, String, String, String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MeetingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MeetingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof meeting_dto_1.CreateMeetingDto !== "undefined" && meeting_dto_1.CreateMeetingDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MeetingsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof meeting_dto_1.UpdateMeetingDto !== "undefined" && meeting_dto_1.UpdateMeetingDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MeetingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MeetingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(":id/close"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], MeetingsController.prototype, "closeMeeting", null);
exports.MeetingsController = MeetingsController = __decorate([
    (0, common_1.Controller)("meetings"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.ADMIN, user_model_1.UserRole.SUPER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof meetings_service_1.MeetingsService !== "undefined" && meetings_service_1.MeetingsService) === "function" ? _a : Object])
], MeetingsController);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMeetingDto = exports.CreateMeetingDto = void 0;
const class_validator_1 = __webpack_require__(15);
const class_transformer_1 = __webpack_require__(17);
class CreateMeetingDto {
}
exports.CreateMeetingDto = CreateMeetingDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateMeetingDto.prototype, "client_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateMeetingDto.prototype, "seller_id", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "meeting_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMeetingDto.prototype, "transcript", void 0);
class UpdateMeetingDto {
}
exports.UpdateMeetingDto = UpdateMeetingDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateMeetingDto.prototype, "client_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateMeetingDto.prototype, "seller_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "meeting_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateMeetingDto.prototype, "closed", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMeetingDto.prototype, "transcript", void 0);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkersModule = void 0;
const common_1 = __webpack_require__(2);
const workers_service_1 = __webpack_require__(37);
const workers_controller_1 = __webpack_require__(41);
let WorkersModule = class WorkersModule {
};
exports.WorkersModule = WorkersModule;
exports.WorkersModule = WorkersModule = __decorate([
    (0, common_1.Module)({
        controllers: [workers_controller_1.WorkersController],
        providers: [workers_service_1.WorkersService],
        exports: [workers_service_1.WorkersService],
    })
], WorkersModule);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkersService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const ioredis_1 = __webpack_require__(38);
const Celery = __webpack_require__(39);
const crypto_1 = __webpack_require__(40);
let WorkersService = class WorkersService {
    constructor(configService) {
        this.configService = configService;
        try {
            const redisConfig = this.configService.get("redis");
            const workersConfig = this.configService.get("workers");
            const redisUrl = `redis://${redisConfig.host}:${redisConfig.port}/0`;
            this.redisUrl = redisUrl;
            this.redis = new ioredis_1.default(redisUrl, {
                maxRetriesPerRequest: 3,
                lazyConnect: true,
            });
            this.celeryClient = Celery.createClient({
                brokerUrl: redisUrl,
                resultBackend: redisUrl.replace("/0", "/1"),
            });
            this.classifyTask = this.celeryClient.createTask("classify_meeting");
            console.log(`🔧 Workers configured with queue: ${workersConfig.queueName}`);
        }
        catch (error) {
            console.error("❌ Error initializing WorkersService:", error);
            this.redis = null;
            this.celeryClient = null;
            this.classifyTask = null;
        }
    }
    async onModuleDestroy() {
        if (this.redis) {
            this.redis.disconnect();
        }
    }
    async classifyMeeting(meetingId, options = {}) {
        try {
            const force = !!options.force_reprocess;
            const callbackUrl = options.callback_url ?? null;
            const taskId = (0, crypto_1.randomUUID)();
            this.classifyTask.applyAsync({
                args: [meetingId, force, callbackUrl],
                kwargs: {},
            });
            console.log(`Queued classification task for meeting ${meetingId} with task ID: ${taskId}`);
            return { taskId };
        }
        catch (err) {
            console.error("Error queuing classification task:", err);
            throw new Error(`Failed to queue classification task: ${err.message}`);
        }
    }
    async classifyMeetingsBatch(meetingIds, forceReprocess = false) {
        try {
            const batchTaskId = `batch_classify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const queuedTasks = [];
            for (const meetingId of meetingIds) {
                const { taskId } = await this.classifyMeeting(meetingId, {
                    force_reprocess: forceReprocess,
                });
                queuedTasks.push(taskId);
            }
            console.log(`Queued batch classification for ${meetingIds.length} meetings`);
            return { taskId: batchTaskId, queuedTasks };
        }
        catch (error) {
            console.error("Error queuing batch classification:", error);
            throw new Error(`Failed to queue batch classification: ${error.message}`);
        }
    }
    async getTaskStatus(taskId) {
        try {
            const taskDataString = await this.redis.get(`celery-task-meta-${taskId}`);
            if (!taskDataString) {
                return {
                    task_id: taskId,
                    status: "pending",
                    meta: { message: "Task not found or still queued" },
                };
            }
            const taskData = JSON.parse(taskDataString);
            let result = null;
            if (taskData.result && taskData.result !== "null") {
                try {
                    result = JSON.parse(taskData.result);
                }
                catch {
                    result = taskData.result;
                }
            }
            let normalizedStatus = taskData.status?.toLowerCase() || "pending";
            if (normalizedStatus === "success") {
                normalizedStatus = "completed";
            }
            else if (normalizedStatus === "failure") {
                normalizedStatus = "failed";
            }
            else if (normalizedStatus === "started" ||
                normalizedStatus === "progress") {
                normalizedStatus = "processing";
            }
            return {
                task_id: taskId,
                status: normalizedStatus,
                result,
                meta: taskData.meta ? JSON.parse(taskData.meta) : null,
                error: taskData.traceback,
            };
        }
        catch (error) {
            console.error("❌ Error getting task status:", error);
            throw new Error(`Failed to get task status: ${error.message}`);
        }
    }
    async getClassificationResult(meetingId) {
        try {
            const resultKey = `classification_result:${meetingId}`;
            const result = await this.redis.get(resultKey);
            if (!result) {
                return null;
            }
            return JSON.parse(result);
        }
        catch (error) {
            console.error("Error getting classification result:", error);
            throw new Error(`Failed to get classification result: ${error.message}`);
        }
    }
    async getAllClassificationResults() {
        try {
            const resultKeys = await this.redis.keys("classification_result:*");
            const results = [];
            for (const key of resultKeys) {
                const result = await this.redis.get(key);
                if (result) {
                    const meetingId = key.replace("classification_result:", "");
                    results.push({
                        meeting_id: parseInt(meetingId),
                        classification: JSON.parse(result),
                    });
                }
            }
            return results;
        }
        catch (error) {
            console.error("Error getting all classification results:", error);
            throw new Error(`Failed to get classification results: ${error.message}`);
        }
    }
    async deleteClassificationResult(meetingId) {
        try {
            const resultKey = `classification_result:${meetingId}`;
            const deleted = await this.redis.del(resultKey);
            return deleted > 0;
        }
        catch (error) {
            console.error("Error deleting classification result:", error);
            throw new Error(`Failed to delete classification result: ${error.message}`);
        }
    }
    async getWorkerStats() {
        try {
            if (!this.redis) {
                return {
                    queue_length: 0,
                    total_tasks: 0,
                    sampled_tasks: 0,
                    task_counts: { pending: 0, processing: 0, completed: 0, failed: 0 },
                    recent_tasks_24h: 0,
                    redis_connected: false,
                    error: "Redis not initialized",
                    timestamp: new Date().toISOString(),
                };
            }
            await this.redis.ping();
            const taskKeys = await this.redis.keys("celery-task-meta-*");
            const statusCounts = {
                pending: 0,
                processing: 0,
                completed: 0,
                failed: 0,
            };
            const sampleSize = Math.min(taskKeys.length, 1000);
            const sampleKeys = taskKeys.slice(0, sampleSize);
            for (const key of sampleKeys) {
                const taskDataString = await this.redis.get(key);
                if (taskDataString) {
                    try {
                        const taskData = JSON.parse(taskDataString);
                        const status = taskData.status;
                        if (status) {
                            const normalizedStatus = status.toLowerCase();
                            if (normalizedStatus === "success") {
                                statusCounts.completed++;
                            }
                            else if (normalizedStatus === "failure") {
                                statusCounts.failed++;
                            }
                            else if (normalizedStatus === "started" ||
                                normalizedStatus === "progress") {
                                statusCounts.processing++;
                            }
                            else {
                                statusCounts.pending++;
                            }
                        }
                    }
                    catch (parseError) {
                        console.warn(`Failed to parse task data for key ${key}:`, parseError);
                    }
                }
            }
            const recentTasks = await this.getRecentTasks(24);
            return {
                queue_length: 0,
                total_tasks: taskKeys.length,
                sampled_tasks: sampleSize,
                task_counts: statusCounts,
                recent_tasks_24h: recentTasks.length,
                redis_connected: true,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            console.error("❌ Error getting worker stats:", error);
            return {
                queue_length: 0,
                total_tasks: 0,
                sampled_tasks: 0,
                task_counts: { pending: 0, processing: 0, completed: 0, failed: 0 },
                recent_tasks_24h: 0,
                redis_connected: false,
                error: error.message,
                timestamp: new Date().toISOString(),
            };
        }
    }
    async getRecentTasks(hours = 24) {
        try {
            const cutoffTime = Date.now() - hours * 60 * 60 * 1000;
            const taskKeys = await this.redis.keys("celery-task-meta-*");
            const recentTasks = [];
            for (const key of taskKeys.slice(0, 500)) {
                const taskDataString = await this.redis.get(key);
                if (taskDataString) {
                    try {
                        const taskData = JSON.parse(taskDataString);
                        if (taskData.date_done) {
                            const taskDate = new Date(taskData.date_done).getTime();
                            if (taskDate > cutoffTime) {
                                recentTasks.push({
                                    task_id: taskData.task_id,
                                    status: taskData.status,
                                    date_done: taskData.date_done,
                                });
                            }
                        }
                    }
                    catch (parseError) {
                        console.warn(`Failed to parse task data for key ${key}:`, parseError);
                    }
                }
            }
            return recentTasks.sort((a, b) => new Date(b.date_done).getTime() - new Date(a.date_done).getTime());
        }
        catch (error) {
            console.error("❌ Error getting recent tasks:", error);
            return [];
        }
    }
    async healthCheck() {
        try {
            await this.redis.ping();
            const taskKeys = await this.redis.keys("celery-task-meta-*");
            const totalTasks = taskKeys.length;
            return {
                healthy: true,
                redis: true,
                message: `Worker system is healthy. Total tasks processed: ${totalTasks}`,
            };
        }
        catch (error) {
            return {
                healthy: false,
                redis: false,
                message: `Worker system unhealthy: ${error.message}`,
            };
        }
    }
};
exports.WorkersService = WorkersService;
exports.WorkersService = WorkersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], WorkersService);


/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("celery-ts");

/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkersController = void 0;
const common_1 = __webpack_require__(2);
const workers_service_1 = __webpack_require__(37);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let WorkersController = class WorkersController {
    constructor(workersService) {
        this.workersService = workersService;
    }
    async classifyMeeting(meetingId, body) {
        const result = await this.workersService.classifyMeeting(meetingId, body);
        const response = {
            success: true,
            message: "Classification task queued successfully",
            data: {
                task_id: result.taskId,
                meeting_id: meetingId,
                status: "queued",
            },
        };
        return response;
    }
    async classifyMeetingsBatch(body) {
        const { meeting_ids, force_reprocess } = body;
        if (!Array.isArray(meeting_ids) || meeting_ids.length === 0) {
            const response = {
                success: false,
                error: "Invalid meeting_ids array provided",
            };
            return response;
        }
        const validIds = meeting_ids.filter((id) => !isNaN(Number(id)));
        if (validIds.length !== meeting_ids.length) {
            const response = {
                success: false,
                error: "All meeting IDs must be valid numbers",
            };
            return response;
        }
        const result = await this.workersService.classifyMeetingsBatch(validIds, force_reprocess || false);
        const response = {
            success: true,
            message: `Batch classification queued for ${validIds.length} meetings`,
            data: {
                batch_task_id: result.taskId,
                queued_tasks: result.queuedTasks,
                meeting_ids: validIds,
                total_queued: result.queuedTasks.length,
            },
        };
        return response;
    }
    async getTaskStatus(taskId) {
        const status = await this.workersService.getTaskStatus(taskId);
        const response = {
            success: true,
            message: "Task status retrieved successfully",
            data: status,
        };
        return response;
    }
    async getWorkerStats() {
        const stats = await this.workersService.getWorkerStats();
        const response = {
            success: true,
            message: "Worker statistics retrieved successfully",
            data: stats,
        };
        return response;
    }
    async workerHealthCheck() {
        const health = await this.workersService.healthCheck();
        const response = {
            success: health.healthy,
            message: health.message,
            data: {
                healthy: health.healthy,
                redis_connected: health.redis,
                timestamp: new Date().toISOString(),
            },
        };
        return response;
    }
    async getClassificationResult(meetingId) {
        const result = await this.workersService.getClassificationResult(meetingId);
        if (!result) {
            const response = {
                success: false,
                message: "Classification result not found for this meeting",
            };
            return response;
        }
        const response = {
            success: true,
            message: "Classification result retrieved successfully",
            data: {
                meeting_id: meetingId,
                classification: result,
            },
        };
        return response;
    }
    async getAllClassificationResults() {
        const results = await this.workersService.getAllClassificationResults();
        const response = {
            success: true,
            message: "All classification results retrieved successfully",
            data: {
                results,
                total_count: results.length,
            },
        };
        return response;
    }
    async deleteClassificationResult(meetingId) {
        const deleted = await this.workersService.deleteClassificationResult(meetingId);
        if (!deleted) {
            const response = {
                success: false,
                message: "Classification result not found for this meeting",
            };
            return response;
        }
        const response = {
            success: true,
            message: "Classification result deleted successfully",
            data: {
                meeting_id: meetingId,
                deleted: true,
            },
        };
        return response;
    }
};
exports.WorkersController = WorkersController;
__decorate([
    (0, common_1.Post)("classify/:meetingId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], WorkersController.prototype, "classifyMeeting", null);
__decorate([
    (0, common_1.Post)("classify/batch"),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], WorkersController.prototype, "classifyMeetingsBatch", null);
__decorate([
    (0, common_1.Get)("task/:taskId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("taskId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], WorkersController.prototype, "getTaskStatus", null);
__decorate([
    (0, common_1.Get)("stats"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], WorkersController.prototype, "getWorkerStats", null);
__decorate([
    (0, common_1.Get)("health"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], WorkersController.prototype, "workerHealthCheck", null);
__decorate([
    (0, common_1.Get)("classification/:meetingId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], WorkersController.prototype, "getClassificationResult", null);
__decorate([
    (0, common_1.Get)("classifications"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], WorkersController.prototype, "getAllClassificationResults", null);
__decorate([
    (0, common_1.Delete)("classification/:meetingId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], WorkersController.prototype, "deleteClassificationResult", null);
exports.WorkersController = WorkersController = __decorate([
    (0, common_1.Controller)("workers"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.ADMIN, user_model_1.UserRole.SUPER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof workers_service_1.WorkersService !== "undefined" && workers_service_1.WorkersService) === "function" ? _a : Object])
], WorkersController);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassificationsModule = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const classifications_service_1 = __webpack_require__(43);
const classifications_controller_1 = __webpack_require__(45);
const meeting_classification_model_1 = __webpack_require__(12);
const meeting_model_1 = __webpack_require__(10);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
let ClassificationsModule = class ClassificationsModule {
};
exports.ClassificationsModule = ClassificationsModule;
exports.ClassificationsModule = ClassificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                meeting_classification_model_1.MeetingClassification,
                meeting_model_1.Meeting,
                client_model_1.Client,
                seller_model_1.Seller,
            ]),
        ],
        controllers: [classifications_controller_1.ClassificationsController],
        providers: [classifications_service_1.ClassificationsService],
        exports: [classifications_service_1.ClassificationsService],
    })
], ClassificationsModule);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassificationsService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const meeting_classification_model_1 = __webpack_require__(12);
const meeting_model_1 = __webpack_require__(10);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
const sequelize_2 = __webpack_require__(44);
let ClassificationsService = class ClassificationsService {
    constructor(meetingClassificationModel, meetingModel, clientModel, sellerModel) {
        this.meetingClassificationModel = meetingClassificationModel;
        this.meetingModel = meetingModel;
        this.clientModel = clientModel;
        this.sellerModel = sellerModel;
    }
    async queueUnclassifiedMeetings() {
        try {
            console.log("Checking for unclassified meetings...");
            const classifiedMeetingIds = await this.meetingClassificationModel
                .findAll({
                attributes: ["meeting_id"],
            })
                .then((classifications) => classifications.map((c) => c.meeting_id));
            const unclassifiedMeetings = await this.meetingModel.findAll({
                where: {
                    id: {
                        [sequelize_2.Op.notIn]: classifiedMeetingIds,
                    },
                },
                include: [
                    {
                        model: this.clientModel,
                        as: "client",
                        attributes: ["name", "email"],
                    },
                    {
                        model: this.sellerModel,
                        as: "seller",
                        attributes: ["name", "email"],
                    },
                ],
                attributes: [
                    "id",
                    "client_id",
                    "seller_id",
                    "meeting_at",
                    "transcript",
                    "closed",
                ],
                order: [["created_at", "ASC"]],
            });
            if (unclassifiedMeetings.length === 0) {
                console.log("No unclassified meetings found");
                return { queued: 0, total: 0 };
            }
            console.log(`Found ${unclassifiedMeetings.length} unclassified meetings`);
            console.log("Meetings to be classified:");
            unclassifiedMeetings.forEach((meeting) => {
                const clientName = meeting.get("client")?.get("name") || "Unknown Client";
                const sellerName = meeting.get("seller")?.get("name") || "Unknown Seller";
                console.log(`- Meeting ${meeting.id}: ${clientName} with ${sellerName} on ${meeting.meeting_at}`);
            });
            return {
                queued: unclassifiedMeetings.length,
                total: unclassifiedMeetings.length,
            };
        }
        catch (error) {
            console.error("Error queuing unclassified meetings:", error);
            throw error;
        }
    }
    async saveClassification(classificationData) {
        try {
            const existing = await this.meetingClassificationModel.findOne({
                where: { meeting_id: classificationData.meeting_id },
            });
            const data = {
                meeting_id: classificationData.meeting_id,
                categories: classificationData.categories,
                confidence_score: classificationData.confidence_score,
                sentiment: classificationData.sentiment,
                key_topics: classificationData.key_topics,
                action_items: classificationData.action_items,
                next_steps: classificationData.next_steps,
                summary: classificationData.summary,
                model_used: classificationData.model_used,
                processed_at: classificationData.processed_at,
                processing_time_ms: classificationData.processing_time_ms,
            };
            if (existing) {
                await existing.update(data);
            }
            else {
                await this.meetingClassificationModel.create(data);
            }
            console.log(`Classification saved for meeting ${classificationData.meeting_id}`);
        }
        catch (error) {
            console.error("Error saving classification:", error);
            throw error;
        }
    }
    async getClassification(meetingId) {
        try {
            const classification = await this.meetingClassificationModel.findOne({
                where: { meeting_id: meetingId },
            });
            if (!classification) {
                return null;
            }
            return classification.toJSON();
        }
        catch (error) {
            console.error("Error getting classification:", error);
            throw error;
        }
    }
    async getAllClassifications() {
        try {
            const classifications = await this.meetingClassificationModel.findAll({
                include: [
                    {
                        model: this.meetingModel,
                        as: "meeting",
                        attributes: ["meeting_at"],
                        include: [
                            {
                                model: this.clientModel,
                                as: "client",
                                attributes: ["name"],
                            },
                            {
                                model: this.sellerModel,
                                as: "seller",
                                attributes: ["name"],
                            },
                        ],
                    },
                ],
                order: [["processed_at", "DESC"]],
            });
            return classifications.map((classification) => {
                const data = classification.toJSON();
                return {
                    ...data,
                    client_name: data.meeting?.client?.name,
                    seller_name: data.meeting?.seller?.name,
                    meeting_at: data.meeting?.meeting_at,
                    meeting: undefined,
                };
            });
        }
        catch (error) {
            console.error("Error getting all classifications:", error);
            throw error;
        }
    }
};
exports.ClassificationsService = ClassificationsService;
exports.ClassificationsService = ClassificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(meeting_classification_model_1.MeetingClassification)),
    __param(1, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(2, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __param(3, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], ClassificationsService);


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassificationsController = void 0;
const common_1 = __webpack_require__(2);
const classifications_service_1 = __webpack_require__(43);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let ClassificationsController = class ClassificationsController {
    constructor(classificationsService) {
        this.classificationsService = classificationsService;
    }
    async getAllClassifications() {
        const classifications = await this.classificationsService.getAllClassifications();
        const response = {
            success: true,
            data: classifications,
            message: "Classifications retrieved successfully",
        };
        return response;
    }
    async getClassification(meetingId) {
        const classification = await this.classificationsService.getClassification(meetingId);
        if (!classification) {
            const response = {
                success: false,
                error: "Classification not found",
            };
            return response;
        }
        const response = {
            success: true,
            data: classification,
            message: "Classification retrieved successfully",
        };
        return response;
    }
    async queueUnclassifiedMeetings() {
        const result = await this.classificationsService.queueUnclassifiedMeetings();
        const response = {
            success: true,
            data: result,
            message: `Queued ${result.queued} unclassified meetings`,
        };
        return response;
    }
};
exports.ClassificationsController = ClassificationsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ClassificationsController.prototype, "getAllClassifications", null);
__decorate([
    (0, common_1.Get)(":meetingId"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("meetingId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ClassificationsController.prototype, "getClassification", null);
__decorate([
    (0, common_1.Post)("queue-unclassified"),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ClassificationsController.prototype, "queueUnclassifiedMeetings", null);
exports.ClassificationsController = ClassificationsController = __decorate([
    (0, common_1.Controller)("classifications"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.ADMIN, user_model_1.UserRole.SUPER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof classifications_service_1.ClassificationsService !== "undefined" && classifications_service_1.ClassificationsService) === "function" ? _a : Object])
], ClassificationsController);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedsModule = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const config_1 = __webpack_require__(3);
const database_module_1 = __webpack_require__(47);
const workers_module_1 = __webpack_require__(36);
const seeds_service_1 = __webpack_require__(48);
const seeds_controller_1 = __webpack_require__(57);
const client_population_service_1 = __webpack_require__(49);
const seller_population_service_1 = __webpack_require__(50);
const meeting_population_service_1 = __webpack_require__(51);
const classification_queue_service_1 = __webpack_require__(52);
const super_admin_population_service_1 = __webpack_require__(53);
const meeting_model_1 = __webpack_require__(10);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
const meeting_classification_model_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(26);
let SeedsModule = class SeedsModule {
};
exports.SeedsModule = SeedsModule;
exports.SeedsModule = SeedsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
            }),
            database_module_1.DatabaseModule,
            workers_module_1.WorkersModule,
            sequelize_1.SequelizeModule.forFeature([
                meeting_model_1.Meeting,
                client_model_1.Client,
                seller_model_1.Seller,
                meeting_classification_model_1.MeetingClassification,
                user_model_1.User,
            ]),
        ],
        controllers: [seeds_controller_1.SeedsController],
        providers: [
            seeds_service_1.SeedsService,
            client_population_service_1.ClientPopulationService,
            seller_population_service_1.SellerPopulationService,
            meeting_population_service_1.MeetingPopulationService,
            classification_queue_service_1.ClassificationQueueService,
            super_admin_population_service_1.SuperAdminPopulationService,
        ],
        exports: [seeds_service_1.SeedsService],
    })
], SeedsModule);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const config_1 = __webpack_require__(3);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
const meeting_model_1 = __webpack_require__(10);
const meeting_classification_model_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(26);
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const dbConfig = configService.get("database");
                    return {
                        dialect: dbConfig.dialect,
                        host: dbConfig.host,
                        port: dbConfig.port,
                        username: dbConfig.username,
                        password: dbConfig.password,
                        database: dbConfig.database,
                        models: [client_model_1.Client, seller_model_1.Seller, meeting_model_1.Meeting, meeting_classification_model_1.MeetingClassification, user_model_1.User],
                        autoLoadModels: true,
                        synchronize: false,
                        logging: dbConfig.logging,
                        pool: dbConfig.pool,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedsService = void 0;
const common_1 = __webpack_require__(2);
const client_population_service_1 = __webpack_require__(49);
const seller_population_service_1 = __webpack_require__(50);
const meeting_population_service_1 = __webpack_require__(51);
const classification_queue_service_1 = __webpack_require__(52);
const super_admin_population_service_1 = __webpack_require__(53);
const csv_utils_1 = __webpack_require__(54);
let SeedsService = class SeedsService {
    constructor(clientPopulationService, sellerPopulationService, meetingPopulationService, classificationQueueService, superAdminPopulationService) {
        this.clientPopulationService = clientPopulationService;
        this.sellerPopulationService = sellerPopulationService;
        this.meetingPopulationService = meetingPopulationService;
        this.classificationQueueService = classificationQueueService;
        this.superAdminPopulationService = superAdminPopulationService;
    }
    async populateClientsMeetings() {
        console.log("🌱 Starting seed: clients-meetings data population");
        try {
            await this.superAdminPopulationService.populateSuperAdmin();
            const csvFilePath = csv_utils_1.CsvUtils.getCsvFilePath();
            const csvData = csv_utils_1.CsvUtils.parseCSV(csvFilePath);
            csv_utils_1.CsvUtils.validateCsvData(csvData);
            const clientsResult = await this.clientPopulationService.populateClients(csvData);
            const sellersResult = await this.sellerPopulationService.populateSellers(csvData);
            const meetingsResult = await this.meetingPopulationService.populateMeetings(csvData);
            console.log("✅ Data population completed successfully:");
            console.log(`- Clients: ${clientsResult.inserted} inserted, ${clientsResult.skipped} skipped`);
            console.log(`- Sellers: ${sellersResult.inserted} inserted, ${sellersResult.skipped} skipped`);
            console.log(`- Meetings: ${meetingsResult.inserted} inserted, ${meetingsResult.skipped} skipped`);
            console.log(`- Total CSV rows processed: ${csvData.length}`);
            if (meetingsResult.insertedMeetingIds.length > 0) {
                console.log("🔄 Auto-queuing classifications for meetings...");
                await this.classificationQueueService.queueClassificationsForMeetings(meetingsResult.insertedMeetingIds);
            }
            else {
                console.log("No new meetings to classify");
            }
        }
        catch (error) {
            console.error("❌ Seed failed:", error.message);
            console.log("⚠️  Continuing with application startup...");
        }
    }
};
exports.SeedsService = SeedsService;
exports.SeedsService = SeedsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof client_population_service_1.ClientPopulationService !== "undefined" && client_population_service_1.ClientPopulationService) === "function" ? _a : Object, typeof (_b = typeof seller_population_service_1.SellerPopulationService !== "undefined" && seller_population_service_1.SellerPopulationService) === "function" ? _b : Object, typeof (_c = typeof meeting_population_service_1.MeetingPopulationService !== "undefined" && meeting_population_service_1.MeetingPopulationService) === "function" ? _c : Object, typeof (_d = typeof classification_queue_service_1.ClassificationQueueService !== "undefined" && classification_queue_service_1.ClassificationQueueService) === "function" ? _d : Object, typeof (_e = typeof super_admin_population_service_1.SuperAdminPopulationService !== "undefined" && super_admin_population_service_1.SuperAdminPopulationService) === "function" ? _e : Object])
], SeedsService);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientPopulationService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const client_model_1 = __webpack_require__(8);
let ClientPopulationService = class ClientPopulationService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async populateClients(csvData) {
        console.log('👥 Populating clients...');
        const results = { inserted: 0, skipped: 0 };
        const uniqueClients = new Map();
        for (const row of csvData) {
            if (row['Correo Electronico'] &&
                !uniqueClients.has(row['Correo Electronico'])) {
                try {
                    const [client, created] = await this.clientModel.findOrCreate({
                        where: { email: row['Correo Electronico'] },
                        defaults: {
                            name: row['Nombre'],
                            email: row['Correo Electronico'],
                            phone: row['Numero de Telefono'],
                        },
                    });
                    uniqueClients.set(row['Correo Electronico'], true);
                    if (created) {
                        results.inserted++;
                    }
                    else {
                        results.skipped++;
                    }
                }
                catch (error) {
                    console.log(`⚠️  Error processing client ${row['Correo Electronico']}: ${error.message}`);
                    results.skipped++;
                }
            }
        }
        return results;
    }
};
exports.ClientPopulationService = ClientPopulationService;
exports.ClientPopulationService = ClientPopulationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __metadata("design:paramtypes", [Object])
], ClientPopulationService);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellerPopulationService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const seller_model_1 = __webpack_require__(11);
let SellerPopulationService = class SellerPopulationService {
    constructor(sellerModel) {
        this.sellerModel = sellerModel;
    }
    async populateSellers(csvData) {
        console.log('👨‍💼 Populating sellers...');
        const results = { inserted: 0, skipped: 0 };
        const uniqueSellers = new Map();
        for (const row of csvData) {
            if (row['Vendedor asignado'] &&
                !uniqueSellers.has(row['Vendedor asignado'])) {
                try {
                    const [seller, created] = await this.sellerModel.findOrCreate({
                        where: { name: row['Vendedor asignado'] },
                        defaults: {
                            name: row['Vendedor asignado'],
                            email: `${row['Vendedor asignado']
                                .toLowerCase()
                                .replace(' ', '.')}@vambe.com`,
                            phone: '56912345678',
                            active: true,
                        },
                    });
                    uniqueSellers.set(row['Vendedor asignado'], true);
                    if (created) {
                        results.inserted++;
                    }
                    else {
                        results.skipped++;
                    }
                }
                catch (error) {
                    console.log(`⚠️  Error processing seller ${row['Vendedor asignado']}: ${error.message}`);
                    results.skipped++;
                }
            }
        }
        return results;
    }
};
exports.SellerPopulationService = SellerPopulationService;
exports.SellerPopulationService = SellerPopulationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __metadata("design:paramtypes", [Object])
], SellerPopulationService);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingPopulationService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const meeting_model_1 = __webpack_require__(10);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
let MeetingPopulationService = class MeetingPopulationService {
    constructor(meetingModel, clientModel, sellerModel) {
        this.meetingModel = meetingModel;
        this.clientModel = clientModel;
        this.sellerModel = sellerModel;
    }
    async populateMeetings(csvData) {
        console.log('📅 Populating meetings...');
        const results = {
            inserted: 0,
            skipped: 0,
            insertedMeetingIds: [],
        };
        for (const row of csvData) {
            try {
                const client = await this.clientModel.findOne({
                    where: { email: row['Correo Electronico'] },
                });
                const seller = await this.sellerModel.findOne({
                    where: { name: row['Vendedor asignado'] },
                });
                if (client && seller) {
                    const existingMeeting = await this.meetingModel.findOne({
                        where: {
                            client_id: client.id,
                            seller_id: seller.id,
                            meeting_at: new Date(row['Fecha de la Reunion']),
                        },
                    });
                    if (existingMeeting) {
                        results.skipped++;
                        results.insertedMeetingIds.push(existingMeeting.id);
                    }
                    else {
                        const meeting = await this.meetingModel.create({
                            client_id: client.id,
                            seller_id: seller.id,
                            meeting_at: new Date(row['Fecha de la Reunion']),
                            closed: row['closed'] === '1',
                            transcript: row['Transcripcion'],
                        });
                        results.inserted++;
                        results.insertedMeetingIds.push(meeting.id);
                    }
                }
                else {
                    results.skipped++;
                }
            }
            catch (error) {
                console.log(`⚠️  Error processing meeting for ${row['Correo Electronico']}: ${error.message}`);
                results.skipped++;
            }
        }
        return results;
    }
};
exports.MeetingPopulationService = MeetingPopulationService;
exports.MeetingPopulationService = MeetingPopulationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(1, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __param(2, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __metadata("design:paramtypes", [Object, Object, Object])
], MeetingPopulationService);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassificationQueueService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const meeting_classification_model_1 = __webpack_require__(12);
const workers_service_1 = __webpack_require__(37);
let ClassificationQueueService = class ClassificationQueueService {
    constructor(meetingClassificationModel, workersService) {
        this.meetingClassificationModel = meetingClassificationModel;
        this.workersService = workersService;
    }
    async queueClassificationsForMeetings(meetingIds) {
        const result = {
            queued: 0,
            skipped: 0,
            errors: 0,
        };
        console.log(`🔄 Processing ${meetingIds.length} meetings for classification...`);
        for (const meetingId of meetingIds) {
            try {
                const existingClassification = await this.meetingClassificationModel.findOne({
                    where: { meeting_id: meetingId },
                });
                if (!existingClassification) {
                    console.log(`🔄 Queuing classification for meeting ${meetingId}...`);
                    await this.workersService.classifyMeeting(meetingId);
                    result.queued++;
                }
                else {
                    console.log(`✅ Meeting ${meetingId} already has a classification`);
                    result.skipped++;
                }
            }
            catch (error) {
                console.error(`❌ Error queuing classification for meeting ${meetingId}:`, error.message);
                result.errors++;
            }
        }
        console.log(`📊 Classification queue results:`);
        console.log(`- Queued: ${result.queued}`);
        console.log(`- Skipped: ${result.skipped}`);
        console.log(`- Errors: ${result.errors}`);
        return result;
    }
};
exports.ClassificationQueueService = ClassificationQueueService;
exports.ClassificationQueueService = ClassificationQueueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(meeting_classification_model_1.MeetingClassification)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof workers_service_1.WorkersService !== "undefined" && workers_service_1.WorkersService) === "function" ? _a : Object])
], ClassificationQueueService);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuperAdminPopulationService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const config_1 = __webpack_require__(3);
const user_model_1 = __webpack_require__(26);
let SuperAdminPopulationService = class SuperAdminPopulationService {
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
    }
    async populateSuperAdmin() {
        console.log('🌱 Starting super admin population...');
        const superAdminEmail = this.configService.get('app.superAdminEmail');
        const superAdminPassword = this.configService.get('app.superAdminPassword');
        const superAdminName = this.configService.get('app.superAdminName');
        try {
            const existingSuperAdmin = await this.userModel.findOne({
                where: { email: superAdminEmail }
            });
            if (existingSuperAdmin) {
                console.log('✅ Super admin already exists, skipping creation');
                return;
            }
            const superAdmin = await this.userModel.create({
                email: superAdminEmail,
                name: superAdminName,
                password: superAdminPassword,
                role: user_model_1.UserRole.SUPER_ADMIN,
                active: true,
            });
            console.log(`✅ Super admin created successfully with ID: ${superAdmin.id}`);
            console.log(`📧 Email: ${superAdminEmail}`);
            console.log(`🔑 Password: ${superAdminPassword}`);
            console.log('⚠️  Please change the password after first login!');
        }
        catch (error) {
            console.error('❌ Error creating super admin:', error);
            throw error;
        }
    }
};
exports.SuperAdminPopulationService = SuperAdminPopulationService;
exports.SuperAdminPopulationService = SuperAdminPopulationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], SuperAdminPopulationService);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CsvUtils = void 0;
const path = __webpack_require__(55);
const fs = __webpack_require__(56);
class CsvUtils {
    static parseCSV(filePath) {
        console.log(`📁 Reading CSV from: ${filePath}`);
        const csvContent = fs.readFileSync(filePath, 'utf-8');
        const lines = csvContent.split('\n').filter((line) => line.trim());
        const headers = this.parseCSVLine(lines[0]);
        const csvData = lines.slice(1).map((line) => {
            const values = this.parseCSVLine(line);
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            return row;
        });
        console.log(`📊 Found ${csvData.length} rows in CSV`);
        return csvData;
    }
    static parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        let i = 0;
        while (i < line.length) {
            const char = line[i];
            const nextChar = line[i + 1];
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i += 2;
                }
                else {
                    inQuotes = !inQuotes;
                    i++;
                }
            }
            else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
                i++;
            }
            else {
                current += char;
                i++;
            }
        }
        result.push(current.trim());
        return result;
    }
    static getCsvFilePath() {
        const possiblePaths = [
            path.join(__dirname, '../../../database/seeds/clients-meetings.csv'),
            path.join(process.cwd(), 'src/database/seeds/clients-meetings.csv'),
            path.join(process.cwd(), 'api/src/database/seeds/clients-meetings.csv'),
            '/app/src/database/seeds/clients-meetings.csv',
        ];
        let csvFilePath = null;
        for (const possiblePath of possiblePaths) {
            if (fs.existsSync(possiblePath)) {
                csvFilePath = possiblePath;
                break;
            }
        }
        if (!csvFilePath) {
            throw new Error(`CSV file not found. Tried paths: ${possiblePaths.join(', ')}`);
        }
        return csvFilePath;
    }
    static validateCsvData(csvData) {
        if (!csvData || csvData.length === 0) {
            throw new Error('CSV data is empty or invalid');
        }
        const requiredFields = [
            'Nombre',
            'Correo Electronico',
            'Vendedor asignado',
            'Fecha de la Reunion',
            'Transcripcion',
        ];
        const firstRow = csvData[0];
        for (const field of requiredFields) {
            if (!(field in firstRow)) {
                throw new Error(`Missing required field: ${field}`);
            }
        }
        return true;
    }
}
exports.CsvUtils = CsvUtils;


/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 56 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedsController = void 0;
const common_1 = __webpack_require__(2);
const seeds_service_1 = __webpack_require__(48);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let SeedsController = class SeedsController {
    constructor(seedsService) {
        this.seedsService = seedsService;
    }
    async populateData(user) {
        await this.seedsService.populateClientsMeetings();
        return {
            success: true,
            message: "Seeds executed successfully"
        };
    }
};
exports.SeedsController = SeedsController;
__decorate([
    (0, common_1.Post)("populate"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], SeedsController.prototype, "populateData", null);
exports.SeedsController = SeedsController = __decorate([
    (0, common_1.Controller)("seeds"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.SUPER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof seeds_service_1.SeedsService !== "undefined" && seeds_service_1.SeedsService) === "function" ? _a : Object])
], SeedsController);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KpisModule = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const kpis_controller_1 = __webpack_require__(59);
const kpis_service_1 = __webpack_require__(60);
const overview_kpis_service_1 = __webpack_require__(61);
const seller_performance_kpis_service_1 = __webpack_require__(62);
const meeting_trends_kpis_service_1 = __webpack_require__(63);
const client_engagement_kpis_service_1 = __webpack_require__(65);
const client_analysis_kpis_service_1 = __webpack_require__(66);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
const meeting_model_1 = __webpack_require__(10);
const meeting_classification_model_1 = __webpack_require__(12);
let KpisModule = class KpisModule {
};
exports.KpisModule = KpisModule;
exports.KpisModule = KpisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                client_model_1.Client,
                seller_model_1.Seller,
                meeting_model_1.Meeting,
                meeting_classification_model_1.MeetingClassification,
            ]),
        ],
        controllers: [kpis_controller_1.KpisController],
        providers: [
            kpis_service_1.KpisService,
            overview_kpis_service_1.OverviewKpisService,
            seller_performance_kpis_service_1.SellerPerformanceKpisService,
            meeting_trends_kpis_service_1.MeetingTrendsKpisService,
            client_engagement_kpis_service_1.ClientEngagementKpisService,
            client_analysis_kpis_service_1.ClientAnalysisKpisService,
        ],
        exports: [kpis_service_1.KpisService],
    })
], KpisModule);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KpisController = void 0;
const common_1 = __webpack_require__(2);
const kpis_service_1 = __webpack_require__(60);
const kpi_dto_1 = __webpack_require__(64);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let KpisController = class KpisController {
    constructor(kpisService) {
        this.kpisService = kpisService;
    }
    async getAllKpis(filters) {
        const result = await this.kpisService.getAllKpis(filters);
        return {
            success: true,
            data: result,
            message: 'All KPIs retrieved successfully'
        };
    }
    async getOverviewKpis(filters) {
        const result = await this.kpisService.getOverviewKpis(filters);
        return {
            success: true,
            data: result,
            message: 'Overview KPIs retrieved successfully'
        };
    }
    async getSellerPerformanceKpis(filters) {
        const result = await this.kpisService.getSellerPerformanceKpis(filters);
        return {
            success: true,
            data: result,
            message: 'Seller performance KPIs retrieved successfully'
        };
    }
    async getMeetingTrends(filters) {
        const result = await this.kpisService.getMeetingTrends(filters);
        return {
            success: true,
            data: result,
            message: 'Meeting trends KPIs retrieved successfully'
        };
    }
    async getClientEngagementKpis(filters) {
        const result = await this.kpisService.getClientEngagementKpis(filters);
        return {
            success: true,
            data: result,
            message: 'Client engagement KPIs retrieved successfully'
        };
    }
    async getClientAnalysisKpis(filters) {
        const result = await this.kpisService.getClientAnalysisKpis(filters);
        return {
            success: true,
            data: result,
            message: 'Client analysis KPIs retrieved successfully'
        };
    }
};
exports.KpisController = KpisController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof kpi_dto_1.KpiFiltersDto !== "undefined" && kpi_dto_1.KpiFiltersDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "getAllKpis", null);
__decorate([
    (0, common_1.Get)('overview'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof kpi_dto_1.KpiFiltersDto !== "undefined" && kpi_dto_1.KpiFiltersDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "getOverviewKpis", null);
__decorate([
    (0, common_1.Get)('sellers/performance'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof kpi_dto_1.KpiFiltersDto !== "undefined" && kpi_dto_1.KpiFiltersDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "getSellerPerformanceKpis", null);
__decorate([
    (0, common_1.Get)('meetings/trends'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof kpi_dto_1.KpiFiltersDto !== "undefined" && kpi_dto_1.KpiFiltersDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "getMeetingTrends", null);
__decorate([
    (0, common_1.Get)('clients/engagement'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof kpi_dto_1.KpiFiltersDto !== "undefined" && kpi_dto_1.KpiFiltersDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "getClientEngagementKpis", null);
__decorate([
    (0, common_1.Get)('clients/analysis'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof kpi_dto_1.KpiFiltersDto !== "undefined" && kpi_dto_1.KpiFiltersDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], KpisController.prototype, "getClientAnalysisKpis", null);
exports.KpisController = KpisController = __decorate([
    (0, common_1.Controller)('kpis'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.ADMIN, user_model_1.UserRole.SUPER_ADMIN),
    __metadata("design:paramtypes", [typeof (_a = typeof kpis_service_1.KpisService !== "undefined" && kpis_service_1.KpisService) === "function" ? _a : Object])
], KpisController);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KpisService = void 0;
const common_1 = __webpack_require__(2);
const overview_kpis_service_1 = __webpack_require__(61);
const seller_performance_kpis_service_1 = __webpack_require__(62);
const meeting_trends_kpis_service_1 = __webpack_require__(63);
const client_engagement_kpis_service_1 = __webpack_require__(65);
const client_analysis_kpis_service_1 = __webpack_require__(66);
const kpi_dto_1 = __webpack_require__(64);
let KpisService = class KpisService {
    constructor(overviewKpisService, sellerPerformanceKpisService, meetingTrendsKpisService, clientEngagementKpisService, clientAnalysisKpisService) {
        this.overviewKpisService = overviewKpisService;
        this.sellerPerformanceKpisService = sellerPerformanceKpisService;
        this.meetingTrendsKpisService = meetingTrendsKpisService;
        this.clientEngagementKpisService = clientEngagementKpisService;
        this.clientAnalysisKpisService = clientAnalysisKpisService;
    }
    async getAllKpis(filters) {
        const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
        const [overview, sellerPerformance, meetingTrends, clientEngagement,] = await Promise.all([
            this.overviewKpisService.getOverviewKpis(dateFilters),
            this.sellerPerformanceKpisService.getSellerPerformanceKpis(dateFilters),
            this.meetingTrendsKpisService.getMeetingTrends(dateFilters, filters.period || kpi_dto_1.KpiPeriod.MONTHLY),
            this.clientEngagementKpisService.getClientEngagementKpis(dateFilters),
        ]);
        return {
            overview,
            sellerPerformance,
            meetingTrends,
            clientEngagement,
            generatedAt: new Date(),
        };
    }
    async getOverviewKpis(filters) {
        const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
        return this.overviewKpisService.getOverviewKpis(dateFilters);
    }
    async getSellerPerformanceKpis(filters) {
        const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
        return this.sellerPerformanceKpisService.getSellerPerformanceKpis(dateFilters);
    }
    async getMeetingTrends(filters) {
        const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
        return this.meetingTrendsKpisService.getMeetingTrends(dateFilters, filters.period || kpi_dto_1.KpiPeriod.MONTHLY);
    }
    async getClientEngagementKpis(filters) {
        const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
        return this.clientEngagementKpisService.getClientEngagementKpis(dateFilters);
    }
    async getClientAnalysisKpis(filters) {
        const dateFilters = this.buildDateFilters(filters.startDate, filters.endDate);
        return this.clientAnalysisKpisService.getClientAnalysisKpis(dateFilters);
    }
    buildDateFilters(startDate, endDate) {
        const filters = {};
        if (startDate || endDate) {
            filters.meeting_at = {};
            if (startDate) {
                filters.meeting_at.gte = new Date(startDate);
            }
            if (endDate) {
                filters.meeting_at.lte = new Date(endDate);
            }
        }
        return filters;
    }
};
exports.KpisService = KpisService;
exports.KpisService = KpisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof overview_kpis_service_1.OverviewKpisService !== "undefined" && overview_kpis_service_1.OverviewKpisService) === "function" ? _a : Object, typeof (_b = typeof seller_performance_kpis_service_1.SellerPerformanceKpisService !== "undefined" && seller_performance_kpis_service_1.SellerPerformanceKpisService) === "function" ? _b : Object, typeof (_c = typeof meeting_trends_kpis_service_1.MeetingTrendsKpisService !== "undefined" && meeting_trends_kpis_service_1.MeetingTrendsKpisService) === "function" ? _c : Object, typeof (_d = typeof client_engagement_kpis_service_1.ClientEngagementKpisService !== "undefined" && client_engagement_kpis_service_1.ClientEngagementKpisService) === "function" ? _d : Object, typeof (_e = typeof client_analysis_kpis_service_1.ClientAnalysisKpisService !== "undefined" && client_analysis_kpis_service_1.ClientAnalysisKpisService) === "function" ? _e : Object])
], KpisService);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OverviewKpisService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const sequelize_2 = __webpack_require__(44);
const client_model_1 = __webpack_require__(8);
const seller_model_1 = __webpack_require__(11);
const meeting_model_1 = __webpack_require__(10);
const meeting_classification_model_1 = __webpack_require__(12);
let OverviewKpisService = class OverviewKpisService {
    constructor(clientModel, sellerModel, meetingModel, meetingClassificationModel) {
        this.clientModel = clientModel;
        this.sellerModel = sellerModel;
        this.meetingModel = meetingModel;
        this.meetingClassificationModel = meetingClassificationModel;
    }
    async getOverviewKpis(dateFilters) {
        const [totalClients, totalSellers, totalMeetings, totalClassifications, meetingsThisMonth, meetingsLastWeek, completedMeetings,] = await Promise.all([
            this.getTotalClients(),
            this.getTotalSellers(),
            this.getTotalMeetings(dateFilters),
            this.getTotalClassifications(dateFilters),
            this.getMeetingsThisMonth(),
            this.getMeetingsLastWeek(),
            this.getCompletedMeetings(dateFilters),
        ]);
        const averageConversionRate = totalMeetings > 0 ? completedMeetings / totalMeetings : 0;
        const averageMeetingDuration = 45;
        return {
            totalClients,
            totalSellers,
            totalMeetings,
            totalClassifications,
            meetingsThisMonth,
            meetingsLastWeek,
            averageConversionRate,
            averageMeetingDuration,
        };
    }
    async getTotalClients() {
        return this.clientModel.count();
    }
    async getTotalSellers() {
        return this.sellerModel.count();
    }
    async getTotalMeetings(dateFilters) {
        return this.meetingModel.count({
            where: dateFilters,
        });
    }
    async getTotalClassifications(dateFilters) {
        return this.meetingClassificationModel.count({
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                },
            ],
        });
    }
    async getMeetingsThisMonth() {
        const thisMonthStart = new Date();
        thisMonthStart.setDate(1);
        thisMonthStart.setHours(0, 0, 0, 0);
        return this.meetingModel.count({
            where: {
                meeting_at: {
                    [sequelize_2.Op.gte]: thisMonthStart,
                },
            },
        });
    }
    async getMeetingsLastWeek() {
        const lastWeekStart = new Date();
        lastWeekStart.setDate(lastWeekStart.getDate() - 7);
        lastWeekStart.setHours(0, 0, 0, 0);
        return this.meetingModel.count({
            where: {
                meeting_at: {
                    [sequelize_2.Op.gte]: lastWeekStart,
                },
            },
        });
    }
    async getCompletedMeetings(dateFilters) {
        return this.meetingModel.count({
            where: {
                ...dateFilters,
                closed: true,
            },
        });
    }
};
exports.OverviewKpisService = OverviewKpisService;
exports.OverviewKpisService = OverviewKpisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __param(1, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __param(2, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(3, (0, sequelize_1.InjectModel)(meeting_classification_model_1.MeetingClassification)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], OverviewKpisService);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellerPerformanceKpisService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const seller_model_1 = __webpack_require__(11);
const meeting_model_1 = __webpack_require__(10);
const meeting_classification_model_1 = __webpack_require__(12);
let SellerPerformanceKpisService = class SellerPerformanceKpisService {
    constructor(sellerModel, meetingModel, meetingClassificationModel) {
        this.sellerModel = sellerModel;
        this.meetingModel = meetingModel;
        this.meetingClassificationModel = meetingClassificationModel;
    }
    async getSellerPerformanceKpis(dateFilters) {
        const sellers = await this.getSellersWithMeetings(dateFilters);
        const sellerPerformances = this.calculateSellerPerformances(sellers);
        const rankedPerformances = this.rankSellerPerformances(sellerPerformances);
        return rankedPerformances;
    }
    async getSellersWithMeetings(dateFilters) {
        return this.sellerModel.findAll({
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: false,
                    include: [
                        {
                            model: meeting_classification_model_1.MeetingClassification,
                            required: false,
                        },
                    ],
                },
            ],
        });
    }
    calculateSellerPerformances(sellers) {
        return sellers.map((seller) => {
            const meetings = seller.meetings || [];
            const performance = this.calculateIndividualPerformance(seller, meetings);
            return {
                sellerId: seller.id,
                sellerName: seller.name,
                totalMeetings: performance.totalMeetings,
                completedMeetings: performance.completedMeetings,
                completionRate: performance.completionRate,
                averagePositiveSentiment: performance.averagePositiveSentiment,
                totalClassifications: performance.totalClassifications,
                averageConfidence: performance.averageConfidence,
                ranking: 0,
            };
        });
    }
    calculateIndividualPerformance(seller, meetings) {
        const totalMeetings = meetings.length;
        const completedMeetings = meetings.filter(m => m.closed === true).length;
        const completionRate = totalMeetings > 0 ? completedMeetings / totalMeetings : 0;
        const classifications = meetings
            .flatMap(m => m.classifications || [])
            .filter(c => c);
        const positiveClassifications = classifications.filter(c => c.sentiment === 'positive');
        const averagePositiveSentiment = classifications.length > 0
            ? positiveClassifications.length / classifications.length
            : 0;
        const totalClassifications = classifications.length;
        const averageConfidence = classifications.length > 0
            ? classifications.reduce((sum, c) => sum + c.confidence_score, 0) / classifications.length
            : 0;
        return {
            totalMeetings,
            completedMeetings,
            completionRate: Math.round(completionRate * 100) / 100,
            averagePositiveSentiment: Math.round(averagePositiveSentiment * 100) / 100,
            totalClassifications,
            averageConfidence: Math.round(averageConfidence * 100) / 100,
        };
    }
    rankSellerPerformances(performances) {
        performances.sort((a, b) => {
            const scoreA = (a.completionRate * 0.4) + (a.averagePositiveSentiment * 0.6);
            const scoreB = (b.completionRate * 0.4) + (b.averagePositiveSentiment * 0.6);
            return scoreB - scoreA;
        });
        performances.forEach((seller, index) => {
            seller.ranking = index + 1;
        });
        return performances;
    }
};
exports.SellerPerformanceKpisService = SellerPerformanceKpisService;
exports.SellerPerformanceKpisService = SellerPerformanceKpisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __param(1, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(2, (0, sequelize_1.InjectModel)(meeting_classification_model_1.MeetingClassification)),
    __metadata("design:paramtypes", [Object, Object, Object])
], SellerPerformanceKpisService);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingTrendsKpisService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const sequelize_2 = __webpack_require__(44);
const meeting_model_1 = __webpack_require__(10);
const kpi_dto_1 = __webpack_require__(64);
let MeetingTrendsKpisService = class MeetingTrendsKpisService {
    constructor(meetingModel) {
        this.meetingModel = meetingModel;
    }
    async getMeetingTrends(dateFilters, period) {
        const groupByConfig = this.getGroupByFormat(period);
        const trends = await this.getTrendsData(dateFilters, groupByConfig);
        return this.processTrendsData(trends);
    }
    getGroupByFormat(period) {
        const formats = {
            [kpi_dto_1.KpiPeriod.DAILY]: { format: 'YYYY-MM-DD', groupBy: sequelize_2.Sequelize.fn('DATE', sequelize_2.Sequelize.col('meeting_at')) },
            [kpi_dto_1.KpiPeriod.WEEKLY]: { format: 'YYYY-"W"WW', groupBy: sequelize_2.Sequelize.fn('DATE_TRUNC', 'week', sequelize_2.Sequelize.col('meeting_at')) },
            [kpi_dto_1.KpiPeriod.MONTHLY]: { format: 'YYYY-MM', groupBy: sequelize_2.Sequelize.fn('DATE_TRUNC', 'month', sequelize_2.Sequelize.col('meeting_at')) },
            [kpi_dto_1.KpiPeriod.QUARTERLY]: { format: 'YYYY"Q"Q', groupBy: sequelize_2.Sequelize.fn('DATE_TRUNC', 'quarter', sequelize_2.Sequelize.col('meeting_at')) },
            [kpi_dto_1.KpiPeriod.YEARLY]: { format: 'YYYY', groupBy: sequelize_2.Sequelize.fn('DATE_TRUNC', 'year', sequelize_2.Sequelize.col('meeting_at')) },
        };
        return formats[period] || formats[kpi_dto_1.KpiPeriod.MONTHLY];
    }
    async getTrendsData(dateFilters, groupByConfig) {
        return this.meetingModel.findAll({
            attributes: [
                [sequelize_2.Sequelize.fn('TO_CHAR', groupByConfig.groupBy, groupByConfig.format), 'period'],
                [sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.col('Meeting.id')), 'totalMeetings'],
                [
                    sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.literal(`CASE WHEN closed = true THEN 1 END`)),
                    'completedMeetings'
                ],
                [
                    sequelize_2.Sequelize.fn('COUNT', sequelize_2.Sequelize.literal(`CASE WHEN closed = false THEN 1 END`)),
                    'cancelledMeetings'
                ],
                [sequelize_2.Sequelize.literal('45'), 'averageDuration'],
            ],
            where: dateFilters,
            group: [groupByConfig.groupBy],
            order: [[groupByConfig.groupBy, 'ASC']],
            raw: true,
        });
    }
    processTrendsData(trends) {
        return trends.map((trend) => {
            const totalMeetings = Number(trend.totalMeetings);
            const completedMeetings = Number(trend.completedMeetings);
            const cancelledMeetings = Number(trend.cancelledMeetings);
            const completionRate = totalMeetings > 0 ? completedMeetings / totalMeetings : 0;
            return {
                period: trend.period,
                totalMeetings,
                completedMeetings,
                cancelledMeetings,
                completionRate: Math.round(completionRate * 100) / 100,
                averageDuration: trend.averageDuration ? Math.round(Number(trend.averageDuration)) : 0,
            };
        });
    }
};
exports.MeetingTrendsKpisService = MeetingTrendsKpisService;
exports.MeetingTrendsKpisService = MeetingTrendsKpisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __metadata("design:paramtypes", [Object])
], MeetingTrendsKpisService);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllKpisResponseDto = exports.ClientAnalysisKpisDto = exports.PrimaryPainPointAnalysisDto = exports.UseCaseAnalysisDto = exports.TechnologyAnalysisDto = exports.LeadSourceAnalysisDto = exports.SectorAnalysisDto = exports.ClientEngagementKpisDto = exports.MeetingTrendsDto = exports.SellerPerformanceKpisDto = exports.OverviewKpisDto = exports.KpiFiltersDto = exports.KpiType = exports.KpiPeriod = void 0;
const class_validator_1 = __webpack_require__(15);
var KpiPeriod;
(function (KpiPeriod) {
    KpiPeriod["DAILY"] = "daily";
    KpiPeriod["WEEKLY"] = "weekly";
    KpiPeriod["MONTHLY"] = "monthly";
    KpiPeriod["QUARTERLY"] = "quarterly";
    KpiPeriod["YEARLY"] = "yearly";
})(KpiPeriod || (exports.KpiPeriod = KpiPeriod = {}));
var KpiType;
(function (KpiType) {
    KpiType["OVERVIEW"] = "overview";
    KpiType["MEETINGS"] = "meetings";
    KpiType["SENTIMENT"] = "sentiment";
    KpiType["SELLERS"] = "sellers";
    KpiType["CLIENTS"] = "clients";
    KpiType["PERFORMANCE"] = "performance";
})(KpiType || (exports.KpiType = KpiType = {}));
class KpiFiltersDto {
}
exports.KpiFiltersDto = KpiFiltersDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], KpiFiltersDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], KpiFiltersDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(KpiPeriod),
    __metadata("design:type", String)
], KpiFiltersDto.prototype, "period", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(KpiType),
    __metadata("design:type", String)
], KpiFiltersDto.prototype, "type", void 0);
class OverviewKpisDto {
}
exports.OverviewKpisDto = OverviewKpisDto;
class SellerPerformanceKpisDto {
}
exports.SellerPerformanceKpisDto = SellerPerformanceKpisDto;
class MeetingTrendsDto {
}
exports.MeetingTrendsDto = MeetingTrendsDto;
class ClientEngagementKpisDto {
}
exports.ClientEngagementKpisDto = ClientEngagementKpisDto;
class SectorAnalysisDto {
}
exports.SectorAnalysisDto = SectorAnalysisDto;
class LeadSourceAnalysisDto {
}
exports.LeadSourceAnalysisDto = LeadSourceAnalysisDto;
class TechnologyAnalysisDto {
}
exports.TechnologyAnalysisDto = TechnologyAnalysisDto;
class UseCaseAnalysisDto {
}
exports.UseCaseAnalysisDto = UseCaseAnalysisDto;
class PrimaryPainPointAnalysisDto {
}
exports.PrimaryPainPointAnalysisDto = PrimaryPainPointAnalysisDto;
class ClientAnalysisKpisDto {
}
exports.ClientAnalysisKpisDto = ClientAnalysisKpisDto;
class AllKpisResponseDto {
}
exports.AllKpisResponseDto = AllKpisResponseDto;


/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientEngagementKpisService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const sequelize_2 = __webpack_require__(44);
const client_model_1 = __webpack_require__(8);
const meeting_model_1 = __webpack_require__(10);
const meeting_classification_model_1 = __webpack_require__(12);
let ClientEngagementKpisService = class ClientEngagementKpisService {
    constructor(clientModel, meetingModel, meetingClassificationModel) {
        this.clientModel = clientModel;
        this.meetingModel = meetingModel;
        this.meetingClassificationModel = meetingClassificationModel;
    }
    async getClientEngagementKpis(dateFilters) {
        const [uniqueClients, activeClientsThisMonth, averageMeetingsPerClient, clientsWithPositiveSentiment, clientsWithNegativeSentiment, newClientsThisMonth, clientRetentionRate,] = await Promise.all([
            this.getUniqueClients(),
            this.getActiveClientsThisMonth(),
            this.getAverageMeetingsPerClient(),
            this.getClientsWithPositiveSentiment(dateFilters),
            this.getClientsWithNegativeSentiment(dateFilters),
            this.getNewClientsThisMonth(),
            this.getClientRetentionRate(),
        ]);
        return {
            uniqueClients,
            activeClientsThisMonth,
            averageMeetingsPerClient: Math.round(averageMeetingsPerClient * 100) / 100,
            clientsWithPositiveSentiment,
            clientsWithNegativeSentiment,
            clientRetentionRate: Math.round(clientRetentionRate * 100) / 100,
            newClientsThisMonth,
        };
    }
    async getUniqueClients() {
        return this.clientModel.count();
    }
    async getActiveClientsThisMonth() {
        const thisMonthStart = new Date();
        thisMonthStart.setDate(1);
        thisMonthStart.setHours(0, 0, 0, 0);
        return this.clientModel.count({
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: {
                        meeting_at: {
                            [sequelize_2.Op.gte]: thisMonthStart,
                        },
                    },
                    required: true,
                },
            ],
        });
    }
    async getAverageMeetingsPerClient() {
        const [totalMeetingsCount, uniqueClients] = await Promise.all([
            this.meetingModel.count(),
            this.clientModel.count(),
        ]);
        return uniqueClients > 0 ? totalMeetingsCount / uniqueClients : 0;
    }
    async getClientsWithPositiveSentiment(dateFilters) {
        return this.clientModel.count({
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                    include: [
                        {
                            model: meeting_classification_model_1.MeetingClassification,
                            where: { sentiment: 'positive' },
                            required: true,
                        },
                    ],
                },
            ],
        });
    }
    async getClientsWithNegativeSentiment(dateFilters) {
        return this.clientModel.count({
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                    include: [
                        {
                            model: meeting_classification_model_1.MeetingClassification,
                            where: { sentiment: 'negative' },
                            required: true,
                        },
                    ],
                },
            ],
        });
    }
    async getNewClientsThisMonth() {
        const thisMonthStart = new Date();
        thisMonthStart.setDate(1);
        thisMonthStart.setHours(0, 0, 0, 0);
        return this.clientModel.count({
            where: {
                created_at: {
                    [sequelize_2.Op.gte]: thisMonthStart,
                },
            },
        });
    }
    async getClientRetentionRate() {
        const [uniqueClients, retainedClients] = await Promise.all([
            this.clientModel.count(),
            this.getRetainedClients(),
        ]);
        return uniqueClients > 0 ? retainedClients / uniqueClients : 0;
    }
    async getRetainedClients() {
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        return this.clientModel.count({
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: {
                        meeting_at: {
                            [sequelize_2.Op.gte]: twoMonthsAgo,
                        },
                    },
                    required: true,
                },
            ],
        });
    }
};
exports.ClientEngagementKpisService = ClientEngagementKpisService;
exports.ClientEngagementKpisService = ClientEngagementKpisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __param(1, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(2, (0, sequelize_1.InjectModel)(meeting_classification_model_1.MeetingClassification)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ClientEngagementKpisService);


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientAnalysisKpisService = void 0;
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(6);
const sequelize_2 = __webpack_require__(44);
const meeting_model_1 = __webpack_require__(10);
const meeting_classification_model_1 = __webpack_require__(12);
let ClientAnalysisKpisService = class ClientAnalysisKpisService {
    constructor(meetingModel, meetingClassificationModel) {
        this.meetingModel = meetingModel;
        this.meetingClassificationModel = meetingClassificationModel;
    }
    async getClientAnalysisKpis(dateFilters) {
        const [topSectors, topLeadSources, topTechnologies, topUseCases, topPrimaryPainPoints, totalAnalyzedMeetings,] = await Promise.all([
            this.getTopSectors(dateFilters),
            this.getTopLeadSources(dateFilters),
            this.getTopVambeProducts(dateFilters),
            this.getUseCases(dateFilters),
            this.getPrimaryPainPoints(dateFilters),
            this.getTotalAnalyzedMeetings(dateFilters),
        ]);
        return {
            topSectors,
            topLeadSources,
            topTechnologies,
            topUseCases,
            topPrimaryPainPoints,
            totalAnalyzedMeetings,
        };
    }
    async getTopSectors(dateFilters) {
        const classifications = await this.meetingClassificationModel.findAll({
            attributes: ['business_sector'],
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                },
            ],
            where: {
                business_sector: {
                    [sequelize_2.Op.ne]: null,
                },
            },
        });
        const sectorCounts = this.countOccurrences(classifications.map(c => c.business_sector).filter(Boolean));
        const total = classifications.length;
        return this.formatSectorAnalysisData(sectorCounts, total);
    }
    async getTopLeadSources(dateFilters) {
        const classifications = await this.meetingClassificationModel.findAll({
            attributes: ['lead_source'],
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                },
            ],
            where: {
                lead_source: {
                    [sequelize_2.Op.ne]: null,
                },
            },
        });
        const sourceCounts = this.countOccurrences(classifications.map(c => c.lead_source).filter(Boolean));
        const total = classifications.length;
        return this.formatLeadSourceAnalysisData(sourceCounts, total);
    }
    async getTopVambeProducts(dateFilters) {
        const classifications = await this.meetingClassificationModel.findAll({
            attributes: ['vambe_product'],
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                    attributes: [],
                },
            ],
            where: {
                vambe_product: {
                    [sequelize_2.Op.ne]: null,
                },
            },
        });
        const vambeProductCounts = this.countOccurrences(classifications.map(c => c.vambe_product).filter(Boolean));
        const total = classifications.length;
        return this.formatTechnologyAnalysisData(vambeProductCounts, total);
    }
    async getUseCases(dateFilters) {
        const classifications = await this.meetingClassificationModel.findAll({
            attributes: ['use_case'],
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                    attributes: [],
                },
            ],
            where: {
                use_case: {
                    [sequelize_2.Op.ne]: null,
                },
            },
        });
        const useCaseCounts = this.countOccurrences(classifications.map(c => c.use_case).filter(Boolean));
        const total = classifications.length;
        return this.formatUseCaseAnalysisData(useCaseCounts, total);
    }
    async getPrimaryPainPoints(dateFilters) {
        const classifications = await this.meetingClassificationModel.findAll({
            attributes: ['primary_pain_point'],
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                    attributes: [],
                },
            ],
            where: {
                primary_pain_point: {
                    [sequelize_2.Op.ne]: null,
                },
            },
        });
        const painPointCounts = this.countOccurrences(classifications.map(c => c.primary_pain_point).filter(Boolean));
        const total = classifications.length;
        return this.formatPrimaryPainPointAnalysisData(painPointCounts, total);
    }
    async getTotalAnalyzedMeetings(dateFilters) {
        return this.meetingClassificationModel.count({
            include: [
                {
                    model: meeting_model_1.Meeting,
                    where: dateFilters,
                    required: true,
                    attributes: [],
                },
            ],
        });
    }
    countOccurrences(items) {
        return items.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});
    }
    formatSectorAnalysisData(counts, total) {
        const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a);
        return sorted.map(([key, count]) => ({
            sector: key,
            count,
            percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
        }));
    }
    formatLeadSourceAnalysisData(counts, total) {
        const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a);
        return sorted.map(([key, count]) => ({
            source: key,
            count,
            percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
        }));
    }
    formatTechnologyAnalysisData(counts, total) {
        const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a);
        return sorted.map(([key, count]) => ({
            vambe_product: key,
            count,
            percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
        }));
    }
    formatUseCaseAnalysisData(counts, total) {
        const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a);
        return sorted.map(([key, count]) => ({
            use_case: key,
            count,
            percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
        }));
    }
    formatPrimaryPainPointAnalysisData(counts, total) {
        const sorted = Object.entries(counts)
            .sort(([, a], [, b]) => b - a);
        return sorted.map(([key, count]) => ({
            primary_pain_point: key,
            count,
            percentage: total > 0 ? Number(((count / total) * 100).toFixed(2)) : 0,
        }));
    }
};
exports.ClientAnalysisKpisService = ClientAnalysisKpisService;
exports.ClientAnalysisKpisService = ClientAnalysisKpisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(1, (0, sequelize_1.InjectModel)(meeting_classification_model_1.MeetingClassification)),
    __metadata("design:paramtypes", [Object, Object])
], ClientAnalysisKpisService);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(68);
const passport_1 = __webpack_require__(20);
const config_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(6);
const auth_controller_1 = __webpack_require__(69);
const auth_service_1 = __webpack_require__(70);
const jwt_strategy_1 = __webpack_require__(72);
const user_model_1 = __webpack_require__(26);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            sequelize_1.SequelizeModule.forFeature([user_model_1.User]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('app.jwtSecret') || 'your-secret-key',
                    signOptions: { expiresIn: '3h' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);


/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(70);
const auth_dto_1 = __webpack_require__(71);
const guards_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(22);
const user_model_1 = __webpack_require__(26);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        const result = await this.authService.login(loginDto);
        return {
            success: true,
            data: result,
            message: 'Login successful'
        };
    }
    async register(registerDto, currentUser) {
        const result = await this.authService.register(registerDto, currentUser);
        return {
            success: true,
            data: result,
            message: 'User registered successfully'
        };
    }
    async getProfile(user) {
        const result = await this.authService.getProfile(user.id);
        return {
            success: true,
            data: result,
            message: 'Profile retrieved successfully'
        };
    }
    async refreshToken(refreshTokenDto) {
        const result = await this.authService.refreshToken(refreshTokenDto);
        return {
            success: true,
            data: result,
            message: 'Token refreshed successfully'
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)(user_model_1.UserRole.SUPER_ADMIN),
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof auth_dto_1.RegisterDto !== "undefined" && auth_dto_1.RegisterDto) === "function" ? _c : Object, typeof (_d = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_dto_1.RefreshTokenDto !== "undefined" && auth_dto_1.RefreshTokenDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(68);
const sequelize_1 = __webpack_require__(6);
const config_1 = __webpack_require__(3);
const user_model_1 = __webpack_require__(26);
let AuthService = class AuthService {
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ where: { email } });
        if (user && await user.validatePassword(password)) {
            return user;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.active) {
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const access_token = this.jwtService.sign(payload, {
            expiresIn: '3h',
        });
        return {
            access_token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                active: user.active,
            },
        };
    }
    async register(registerDto, currentUser) {
        if (currentUser && currentUser.role !== user_model_1.UserRole.SUPER_ADMIN) {
            throw new common_1.UnauthorizedException('Only super admin can register users');
        }
        const existingUser = await this.userModel.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        if (!currentUser && registerDto.role !== user_model_1.UserRole.SUPER_ADMIN) {
            throw new common_1.BadRequestException('Only super admin registration is allowed without authentication');
        }
        const user = await this.userModel.create({
            email: registerDto.email,
            name: registerDto.name,
            password: registerDto.password,
            role: registerDto.role || user_model_1.UserRole.USER,
            active: true,
        });
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const access_token = this.jwtService.sign(payload, {
            expiresIn: '3h',
        });
        return {
            access_token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                active: user.active,
            },
        };
    }
    async getProfile(userId) {
        const user = await this.userModel.findByPk(userId, {
            attributes: { exclude: ['password'] },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
    async refreshToken(refreshTokenDto) {
        try {
            const payload = this.jwtService.decode(refreshTokenDto.access_token);
            if (!payload || !payload.sub) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const now = Math.floor(Date.now() / 1000);
            const tokenAge = now - (payload.iat || 0);
            const maxAge = 7 * 24 * 60 * 60;
            if (tokenAge > maxAge) {
                throw new common_1.UnauthorizedException('Token is too old to refresh');
            }
            const user = await this.userModel.findByPk(payload.sub, {
                attributes: { exclude: ['password'] },
            });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            if (!user.active) {
                throw new common_1.UnauthorizedException('Account is inactive');
            }
            const newPayload = {
                sub: user.id,
                email: user.email,
                role: user.role,
            };
            const newAccessToken = this.jwtService.sign(newPayload, {
                expiresIn: '3h',
            });
            return {
                access_token: newAccessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    active: user.active,
                },
            };
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            else {
                throw new common_1.UnauthorizedException('Token refresh failed');
            }
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtPayloadDto = exports.RefreshTokenDto = exports.AuthResponseDto = exports.RegisterDto = exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(15);
const user_model_1 = __webpack_require__(26);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_model_1.UserRole),
    __metadata("design:type", typeof (_a = typeof user_model_1.UserRole !== "undefined" && user_model_1.UserRole) === "function" ? _a : Object)
], RegisterDto.prototype, "role", void 0);
class AuthResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "access_token", void 0);
class JwtPayloadDto {
}
exports.JwtPayloadDto = JwtPayloadDto;


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(20);
const passport_jwt_1 = __webpack_require__(73);
const config_1 = __webpack_require__(3);
const sequelize_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(26);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('app.jwtSecret') || 'your-secret-key',
        });
        this.configService = configService;
        this.userModel = userModel;
    }
    async validate(payload) {
        const user = await this.userModel.findByPk(payload.sub, {
            attributes: { exclude: ['password'] },
        });
        if (!user || !user.active) {
            throw new common_1.UnauthorizedException('User not found or inactive');
        }
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, Object])
], JwtStrategy);


/***/ }),
/* 73 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const common_1 = __webpack_require__(2);
const health_controller_1 = __webpack_require__(75);
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
    })
], HealthModule);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(2);
const public_decorator_1 = __webpack_require__(23);
let HealthController = class HealthController {
    check() {
        return {
            success: true,
            data: {
                status: 'ok',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            },
            message: 'Health check successful'
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health')
], HealthController);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.workersConfig = exports.redisConfig = exports.databaseConfig = exports.appConfig = void 0;
var app_config_1 = __webpack_require__(77);
Object.defineProperty(exports, "appConfig", ({ enumerable: true, get: function () { return app_config_1.default; } }));
var database_config_1 = __webpack_require__(78);
Object.defineProperty(exports, "databaseConfig", ({ enumerable: true, get: function () { return database_config_1.default; } }));
var redis_config_1 = __webpack_require__(79);
Object.defineProperty(exports, "redisConfig", ({ enumerable: true, get: function () { return redis_config_1.default; } }));
var workers_config_1 = __webpack_require__(80);
Object.defineProperty(exports, "workersConfig", ({ enumerable: true, get: function () { return workers_config_1.default; } }));


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)("app", () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    apiPrefix: "api/v1",
    jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
    superAdminEmail: process.env.SUPER_ADMIN_EMAIL || "admin@vambe.ai",
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD || "contrasena superadmin",
    superAdminName: process.env.SUPER_ADMIN_NAME || "superadmin",
    cors: {
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    },
}));


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)("database", () => ({
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "vambe_db",
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}));


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)("redis", () => ({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
}));


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)("workers", () => ({
    queueName: process.env.QUEUE_NAME || "classification",
    concurrency: parseInt(process.env.WORKER_CONCURRENCY, 10) || 1,
    taskTimeout: parseInt(process.env.TASK_TIMEOUT, 10) || 300000,
    maxRetries: parseInt(process.env.MAX_RETRIES, 10) || 3,
}));


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotFoundFilter = void 0;
const common_1 = __webpack_require__(2);
let NotFoundFilter = class NotFoundFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message || "Resource not found";
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: message,
            error: "Not Found",
        });
    }
};
exports.NotFoundFilter = NotFoundFilter;
exports.NotFoundFilter = NotFoundFilter = __decorate([
    (0, common_1.Catch)(common_1.NotFoundException)
], NotFoundFilter);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestLoggerMiddleware = void 0;
const common_1 = __webpack_require__(2);
let RequestLoggerMiddleware = class RequestLoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger("RequestLogger");
    }
    use(req, res, next) {
        const { method, originalUrl, ip, headers } = req;
        const userAgent = headers["user-agent"] || "";
        const startTime = Date.now();
        this.logger.log(`📥 ${method} ${originalUrl} - ${ip} - ${userAgent}`);
        const originalEnd = res.end.bind(res);
        res.end = function (chunk, encoding, cb) {
            const duration = Date.now() - startTime;
            const { statusCode } = res;
            const contentLength = res.get("content-length") || "0";
            let statusInfo = "";
            if (statusCode >= 200 && statusCode < 300) {
                statusInfo = `✅ ${statusCode}`;
            }
            else if (statusCode >= 300 && statusCode < 400) {
                statusInfo = `🔄 ${statusCode}`;
            }
            else if (statusCode >= 400 && statusCode < 500) {
                statusInfo = `❌ ${statusCode}`;
            }
            else if (statusCode >= 500) {
                statusInfo = `💥 ${statusCode}`;
            }
            console.log(`📤 ${method} ${originalUrl} ${statusInfo} - ${duration}ms - ${contentLength} bytes`);
            return originalEnd(chunk, encoding, cb);
        };
        next();
    }
};
exports.RequestLoggerMiddleware = RequestLoggerMiddleware;
exports.RequestLoggerMiddleware = RequestLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], RequestLoggerMiddleware);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
const seeds_service_1 = __webpack_require__(48);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const apiPrefix = configService.get('app.apiPrefix');
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const corsConfig = configService.get('app.cors');
    app.enableCors({
        origin: corsConfig.origin,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: corsConfig.credentials,
    });
    const seedsService = app.get(seeds_service_1.SeedsService);
    await seedsService.populateClientsMeetings();
    const port = configService.get('app.port');
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`📋 API prefix: ${apiPrefix}`);
    console.log(`🌍 Environment: ${configService.get('app.nodeEnv')}`);
}
bootstrap();

})();

/******/ })()
;