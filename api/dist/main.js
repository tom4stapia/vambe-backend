/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const clients_module_1 = __webpack_require__(/*! ./modules/clients/clients.module */ "./src/modules/clients/clients.module.ts");
const sellers_module_1 = __webpack_require__(/*! ./modules/sellers/sellers.module */ "./src/modules/sellers/sellers.module.ts");
const meetings_module_1 = __webpack_require__(/*! ./modules/meetings/meetings.module */ "./src/modules/meetings/meetings.module.ts");
const workers_module_1 = __webpack_require__(/*! ./modules/workers/workers.module */ "./src/modules/workers/workers.module.ts");
const classifications_module_1 = __webpack_require__(/*! ./modules/classifications/classifications.module */ "./src/modules/classifications/classifications.module.ts");
const seeds_module_1 = __webpack_require__(/*! ./modules/seeds/seeds.module */ "./src/modules/seeds/seeds.module.ts");
const database_module_1 = __webpack_require__(/*! ./database/database.module */ "./src/database/database.module.ts");
const config_2 = __webpack_require__(/*! ./config */ "./src/config/index.ts");
const not_found_filter_1 = __webpack_require__(/*! ./common/filters/not-found.filter */ "./src/common/filters/not-found.filter.ts");
const request_logger_middleware_1 = __webpack_require__(/*! ./common/middleware/request-logger.middleware */ "./src/common/middleware/request-logger.middleware.ts");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(request_logger_middleware_1.RequestLoggerMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [config_2.appConfig, config_2.databaseConfig, config_2.redisConfig, config_2.workersConfig],
            }),
            database_module_1.DatabaseModule,
            clients_module_1.ClientsModule,
            sellers_module_1.SellersModule,
            meetings_module_1.MeetingsModule,
            workers_module_1.WorkersModule,
            classifications_module_1.ClassificationsModule,
            seeds_module_1.SeedsModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: not_found_filter_1.NotFoundFilter,
            },
        ],
    })
], AppModule);


/***/ }),

/***/ "./src/common/dto/pagination.dto.ts":
/*!******************************************!*\
  !*** ./src/common/dto/pagination.dto.ts ***!
  \******************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class PaginationDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
        this.sortBy = 'id';
        this.sortOrder = 'ASC';
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
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    __metadata("design:type", String)
], PaginationDto.prototype, "sortOrder", void 0);


/***/ }),

/***/ "./src/common/filters/not-found.filter.ts":
/*!************************************************!*\
  !*** ./src/common/filters/not-found.filter.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotFoundFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let NotFoundFilter = class NotFoundFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message || 'Resource not found';
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: message,
            error: 'Not Found'
        });
    }
};
exports.NotFoundFilter = NotFoundFilter;
exports.NotFoundFilter = NotFoundFilter = __decorate([
    (0, common_1.Catch)(common_1.NotFoundException)
], NotFoundFilter);


/***/ }),

/***/ "./src/common/middleware/request-logger.middleware.ts":
/*!************************************************************!*\
  !*** ./src/common/middleware/request-logger.middleware.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestLoggerMiddleware = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let RequestLoggerMiddleware = class RequestLoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('RequestLogger');
    }
    use(req, res, next) {
        const { method, originalUrl, ip, headers } = req;
        const userAgent = headers['user-agent'] || '';
        const startTime = Date.now();
        this.logger.log(`📥 ${method} ${originalUrl} - ${ip} - ${userAgent}`);
        const originalEnd = res.end.bind(res);
        res.end = function (chunk, encoding, cb) {
            const duration = Date.now() - startTime;
            const { statusCode } = res;
            const contentLength = res.get('content-length') || '0';
            let statusInfo = '';
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


/***/ }),

/***/ "./src/config/app.config.ts":
/*!**********************************!*\
  !*** ./src/config/app.config.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    apiPrefix: 'api/v1',
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    }
}));


/***/ }),

/***/ "./src/config/database.config.ts":
/*!***************************************!*\
  !*** ./src/config/database.config.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('database', () => ({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'vambe_db',
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}));


/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.workersConfig = exports.redisConfig = exports.databaseConfig = exports.appConfig = void 0;
var app_config_1 = __webpack_require__(/*! ./app.config */ "./src/config/app.config.ts");
Object.defineProperty(exports, "appConfig", ({ enumerable: true, get: function () { return app_config_1.default; } }));
var database_config_1 = __webpack_require__(/*! ./database.config */ "./src/config/database.config.ts");
Object.defineProperty(exports, "databaseConfig", ({ enumerable: true, get: function () { return database_config_1.default; } }));
var redis_config_1 = __webpack_require__(/*! ./redis.config */ "./src/config/redis.config.ts");
Object.defineProperty(exports, "redisConfig", ({ enumerable: true, get: function () { return redis_config_1.default; } }));
var workers_config_1 = __webpack_require__(/*! ./workers.config */ "./src/config/workers.config.ts");
Object.defineProperty(exports, "workersConfig", ({ enumerable: true, get: function () { return workers_config_1.default; } }));


/***/ }),

/***/ "./src/config/redis.config.ts":
/*!************************************!*\
  !*** ./src/config/redis.config.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('redis', () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
}));


/***/ }),

/***/ "./src/config/workers.config.ts":
/*!**************************************!*\
  !*** ./src/config/workers.config.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('workers', () => ({
    queueName: process.env.QUEUE_NAME || 'classification',
    concurrency: parseInt(process.env.WORKER_CONCURRENCY, 10) || 1,
    taskTimeout: parseInt(process.env.TASK_TIMEOUT, 10) || 300000,
    maxRetries: parseInt(process.env.MAX_RETRIES, 10) || 3,
}));


/***/ }),

/***/ "./src/database/database.module.ts":
/*!*****************************************!*\
  !*** ./src/database/database.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const client_model_1 = __webpack_require__(/*! ./models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ./models/seller.model */ "./src/database/models/seller.model.ts");
const meeting_model_1 = __webpack_require__(/*! ./models/meeting.model */ "./src/database/models/meeting.model.ts");
const meeting_classification_model_1 = __webpack_require__(/*! ./models/meeting-classification.model */ "./src/database/models/meeting-classification.model.ts");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const dbConfig = configService.get('database');
                    return {
                        dialect: dbConfig.dialect,
                        host: dbConfig.host,
                        port: dbConfig.port,
                        username: dbConfig.username,
                        password: dbConfig.password,
                        database: dbConfig.database,
                        models: [client_model_1.Client, seller_model_1.Seller, meeting_model_1.Meeting, meeting_classification_model_1.MeetingClassification],
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

/***/ "./src/database/models/client.model.ts":
/*!*********************************************!*\
  !*** ./src/database/models/client.model.ts ***!
  \*********************************************/
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
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const meeting_model_1 = __webpack_require__(/*! ./meeting.model */ "./src/database/models/meeting.model.ts");
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
            len: [1, 255]
        }
    }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true
        }
    }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        validate: {
            len: [8, 15]
        }
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
    (0, sequelize_typescript_1.HasMany)(() => meeting_model_1.Meeting, { foreignKey: 'client_id', as: 'meetings' }),
    __metadata("design:type", Array)
], Client.prototype, "meetings", void 0);
exports.Client = Client = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'clients',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                fields: ['email']
            },
            {
                fields: ['phone']
            }
        ]
    })
], Client);


/***/ }),

/***/ "./src/database/models/meeting-classification.model.ts":
/*!*************************************************************!*\
  !*** ./src/database/models/meeting-classification.model.ts ***!
  \*************************************************************/
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
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const meeting_model_1 = __webpack_require__(/*! ./meeting.model */ "./src/database/models/meeting.model.ts");
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
            model: 'meetings',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], MeetingClassification.prototype, "meeting_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de BusinessSector basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "business_sector", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de CompanySize basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "company_size", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de Region basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de LeadSource basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "lead_source", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de VambeProduct basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "vambe_product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de UseCase basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "use_case", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de PrimaryPainPoint basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "primary_pain_point", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        comment: 'Análisis de Urgency basado en la reunión'
    }),
    __metadata("design:type", Boolean)
], MeetingClassification.prototype, "urgency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de DecisionMakerRole basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "decision_maker_role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de PurchaseStage basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "purchase_stage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
        comment: 'Análisis de Language basado en la reunión'
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "language", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        comment: 'Cliente perdido por mala reunión'
    }),
    __metadata("design:type", Boolean)
], MeetingClassification.prototype, "lost_client_bad_meeting", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        defaultValue: []
    }),
    __metadata("design:type", Array)
], MeetingClassification.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0.0
    }),
    __metadata("design:type", Number)
], MeetingClassification.prototype, "confidence_score", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('positive', 'neutral', 'negative'),
        allowNull: false
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "sentiment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        defaultValue: []
    }),
    __metadata("design:type", Array)
], MeetingClassification.prototype, "key_topics", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: false,
        defaultValue: []
    }),
    __metadata("design:type", Array)
], MeetingClassification.prototype, "action_items", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "next_steps", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "summary", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false
    }),
    __metadata("design:type", String)
], MeetingClassification.prototype, "model_used", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MeetingClassification.prototype, "processed_at", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
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
    (0, sequelize_typescript_1.BelongsTo)(() => meeting_model_1.Meeting, { foreignKey: 'meeting_id', as: 'meeting' }),
    __metadata("design:type", typeof (_d = typeof meeting_model_1.Meeting !== "undefined" && meeting_model_1.Meeting) === "function" ? _d : Object)
], MeetingClassification.prototype, "meeting", void 0);
exports.MeetingClassification = MeetingClassification = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'meetings_classifications',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                unique: true,
                fields: ['meeting_id'],
                name: 'meetings_classifications_meeting_id_unique'
            },
            {
                fields: ['processed_at'],
                name: 'meetings_classifications_processed_at_index'
            }
        ]
    })
], MeetingClassification);


/***/ }),

/***/ "./src/database/models/meeting.model.ts":
/*!**********************************************!*\
  !*** ./src/database/models/meeting.model.ts ***!
  \**********************************************/
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
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const client_model_1 = __webpack_require__(/*! ./../models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ./../models/seller.model */ "./src/database/models/seller.model.ts");
const meeting_classification_model_1 = __webpack_require__(/*! ./../models/meeting-classification.model */ "./src/database/models/meeting-classification.model.ts");
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
            model: 'clients',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], Meeting.prototype, "client_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => seller_model_1.Seller),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'sellers',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    }),
    __metadata("design:type", Number)
], Meeting.prototype, "seller_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            notEmpty: true
        }
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
    (0, sequelize_typescript_1.BelongsTo)(() => client_model_1.Client, { foreignKey: 'client_id', as: 'client' }),
    __metadata("design:type", typeof (_d = typeof client_model_1.Client !== "undefined" && client_model_1.Client) === "function" ? _d : Object)
], Meeting.prototype, "client", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => seller_model_1.Seller, { foreignKey: 'seller_id', as: 'seller' }),
    __metadata("design:type", typeof (_e = typeof seller_model_1.Seller !== "undefined" && seller_model_1.Seller) === "function" ? _e : Object)
], Meeting.prototype, "seller", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => meeting_classification_model_1.MeetingClassification, { foreignKey: 'meeting_id', as: 'classifications' }),
    __metadata("design:type", Array)
], Meeting.prototype, "classifications", void 0);
exports.Meeting = Meeting = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'meetings',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                fields: ['client_id']
            },
            {
                fields: ['seller_id']
            },
            {
                fields: ['meeting_at']
            },
            {
                fields: ['closed']
            }
        ]
    })
], Meeting);


/***/ }),

/***/ "./src/database/models/seller.model.ts":
/*!*********************************************!*\
  !*** ./src/database/models/seller.model.ts ***!
  \*********************************************/
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
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const meeting_model_1 = __webpack_require__(/*! ./meeting.model */ "./src/database/models/meeting.model.ts");
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
            len: [1, 255]
        }
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
            notEmpty: true
        }
    }),
    __metadata("design:type", String)
], Seller.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        validate: {
            len: [8, 15]
        }
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
    (0, sequelize_typescript_1.HasMany)(() => meeting_model_1.Meeting, { foreignKey: 'seller_id', as: 'meetings' }),
    __metadata("design:type", Array)
], Seller.prototype, "meetings", void 0);
exports.Seller = Seller = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'sellers',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
            {
                fields: ['email']
            },
            {
                fields: ['active']
            }
        ]
    })
], Seller);


/***/ }),

/***/ "./src/modules/classifications/classifications.controller.ts":
/*!*******************************************************************!*\
  !*** ./src/modules/classifications/classifications.controller.ts ***!
  \*******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const classifications_service_1 = __webpack_require__(/*! ./classifications.service */ "./src/modules/classifications/classifications.service.ts");
let ClassificationsController = class ClassificationsController {
    constructor(classificationsService) {
        this.classificationsService = classificationsService;
    }
    async getAllClassifications() {
        const classifications = await this.classificationsService.getAllClassifications();
        const response = {
            success: true,
            data: classifications,
            message: 'Classifications retrieved successfully'
        };
        return response;
    }
    async getClassification(meetingId) {
        const classification = await this.classificationsService.getClassification(meetingId);
        if (!classification) {
            const response = {
                success: false,
                error: 'Classification not found'
            };
            return response;
        }
        const response = {
            success: true,
            data: classification,
            message: 'Classification retrieved successfully'
        };
        return response;
    }
    async queueUnclassifiedMeetings() {
        const result = await this.classificationsService.queueUnclassifiedMeetings();
        const response = {
            success: true,
            data: result,
            message: `Queued ${result.queued} unclassified meetings`
        };
        return response;
    }
};
exports.ClassificationsController = ClassificationsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ClassificationsController.prototype, "getAllClassifications", null);
__decorate([
    (0, common_1.Get)(':meetingId'),
    __param(0, (0, common_1.Param)('meetingId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ClassificationsController.prototype, "getClassification", null);
__decorate([
    (0, common_1.Post)('queue-unclassified'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ClassificationsController.prototype, "queueUnclassifiedMeetings", null);
exports.ClassificationsController = ClassificationsController = __decorate([
    (0, common_1.Controller)('classifications'),
    __metadata("design:paramtypes", [typeof (_a = typeof classifications_service_1.ClassificationsService !== "undefined" && classifications_service_1.ClassificationsService) === "function" ? _a : Object])
], ClassificationsController);


/***/ }),

/***/ "./src/modules/classifications/classifications.module.ts":
/*!***************************************************************!*\
  !*** ./src/modules/classifications/classifications.module.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClassificationsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const classifications_service_1 = __webpack_require__(/*! ./classifications.service */ "./src/modules/classifications/classifications.service.ts");
const classifications_controller_1 = __webpack_require__(/*! ./classifications.controller */ "./src/modules/classifications/classifications.controller.ts");
const meeting_classification_model_1 = __webpack_require__(/*! ../../database/models/meeting-classification.model */ "./src/database/models/meeting-classification.model.ts");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
let ClassificationsModule = class ClassificationsModule {
};
exports.ClassificationsModule = ClassificationsModule;
exports.ClassificationsModule = ClassificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([meeting_classification_model_1.MeetingClassification, meeting_model_1.Meeting, client_model_1.Client, seller_model_1.Seller])],
        controllers: [classifications_controller_1.ClassificationsController],
        providers: [classifications_service_1.ClassificationsService],
        exports: [classifications_service_1.ClassificationsService],
    })
], ClassificationsModule);


/***/ }),

/***/ "./src/modules/classifications/classifications.service.ts":
/*!****************************************************************!*\
  !*** ./src/modules/classifications/classifications.service.ts ***!
  \****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const meeting_classification_model_1 = __webpack_require__(/*! ../../database/models/meeting-classification.model */ "./src/database/models/meeting-classification.model.ts");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
const sequelize_2 = __webpack_require__(/*! sequelize */ "sequelize");
let ClassificationsService = class ClassificationsService {
    constructor(meetingClassificationModel, meetingModel, clientModel, sellerModel) {
        this.meetingClassificationModel = meetingClassificationModel;
        this.meetingModel = meetingModel;
        this.clientModel = clientModel;
        this.sellerModel = sellerModel;
    }
    async queueUnclassifiedMeetings() {
        try {
            console.log('Checking for unclassified meetings...');
            const classifiedMeetingIds = await this.meetingClassificationModel.findAll({
                attributes: ['meeting_id']
            }).then(classifications => classifications.map(c => c.meeting_id));
            const unclassifiedMeetings = await this.meetingModel.findAll({
                where: {
                    id: {
                        [sequelize_2.Op.notIn]: classifiedMeetingIds
                    }
                },
                include: [
                    {
                        model: this.clientModel,
                        as: 'client',
                        attributes: ['name', 'email']
                    },
                    {
                        model: this.sellerModel,
                        as: 'seller',
                        attributes: ['name', 'email']
                    }
                ],
                attributes: ['id', 'client_id', 'seller_id', 'meeting_at', 'transcript', 'closed'],
                order: [['created_at', 'ASC']]
            });
            if (unclassifiedMeetings.length === 0) {
                console.log('No unclassified meetings found');
                return { queued: 0, total: 0 };
            }
            console.log(`Found ${unclassifiedMeetings.length} unclassified meetings`);
            console.log('Meetings to be classified:');
            unclassifiedMeetings.forEach(meeting => {
                const clientName = meeting.get('client')?.get('name') || 'Unknown Client';
                const sellerName = meeting.get('seller')?.get('name') || 'Unknown Seller';
                console.log(`- Meeting ${meeting.id}: ${clientName} with ${sellerName} on ${meeting.meeting_at}`);
            });
            return {
                queued: unclassifiedMeetings.length,
                total: unclassifiedMeetings.length
            };
        }
        catch (error) {
            console.error('Error queuing unclassified meetings:', error);
            throw error;
        }
    }
    async saveClassification(classificationData) {
        try {
            const existing = await this.meetingClassificationModel.findOne({
                where: { meeting_id: classificationData.meeting_id }
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
                processing_time_ms: classificationData.processing_time_ms
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
            console.error('Error saving classification:', error);
            throw error;
        }
    }
    async getClassification(meetingId) {
        try {
            const classification = await this.meetingClassificationModel.findOne({
                where: { meeting_id: meetingId }
            });
            if (!classification) {
                return null;
            }
            return classification.toJSON();
        }
        catch (error) {
            console.error('Error getting classification:', error);
            throw error;
        }
    }
    async getAllClassifications() {
        try {
            const classifications = await this.meetingClassificationModel.findAll({
                include: [
                    {
                        model: this.meetingModel,
                        as: 'meeting',
                        attributes: ['meeting_at'],
                        include: [
                            {
                                model: this.clientModel,
                                as: 'client',
                                attributes: ['name']
                            },
                            {
                                model: this.sellerModel,
                                as: 'seller',
                                attributes: ['name']
                            }
                        ]
                    }
                ],
                order: [['processed_at', 'DESC']]
            });
            return classifications.map(classification => {
                const data = classification.toJSON();
                return {
                    ...data,
                    client_name: data.meeting?.client?.name,
                    seller_name: data.meeting?.seller?.name,
                    meeting_at: data.meeting?.meeting_at,
                    meeting: undefined
                };
            });
        }
        catch (error) {
            console.error('Error getting all classifications:', error);
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

/***/ "./src/modules/clients/clients.controller.ts":
/*!***************************************************!*\
  !*** ./src/modules/clients/clients.controller.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const clients_service_1 = __webpack_require__(/*! ./clients.service */ "./src/modules/clients/clients.service.ts");
const client_dto_1 = __webpack_require__(/*! ./dto/client.dto */ "./src/modules/clients/dto/client.dto.ts");
const pagination_dto_1 = __webpack_require__(/*! ../../common/dto/pagination.dto */ "./src/common/dto/pagination.dto.ts");
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
                    totalPages: Math.ceil(result.total / (paginationDto.limit || 10))
                }
            },
            message: 'Clients retrieved successfully'
        };
        return response;
    }
    async findOne(id) {
        const client = await this.clientsService.findOne(id);
        const response = {
            success: true,
            data: client,
            message: 'Client retrieved successfully'
        };
        return response;
    }
    async create(createClientDto) {
        const client = await this.clientsService.create(createClientDto);
        const response = {
            success: true,
            data: client,
            message: 'Client created successfully'
        };
        return response;
    }
    async update(id, updateClientDto) {
        const client = await this.clientsService.update(id, updateClientDto);
        const response = {
            success: true,
            data: client,
            message: 'Client updated successfully'
        };
        return response;
    }
    async remove(id) {
        await this.clientsService.remove(id);
        const response = {
            success: true,
            message: 'Client deleted successfully'
        };
        return response;
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ClientsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof client_dto_1.CreateClientDto !== "undefined" && client_dto_1.CreateClientDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof client_dto_1.UpdateClientDto !== "undefined" && client_dto_1.UpdateClientDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ClientsController.prototype, "remove", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [typeof (_a = typeof clients_service_1.ClientsService !== "undefined" && clients_service_1.ClientsService) === "function" ? _a : Object])
], ClientsController);


/***/ }),

/***/ "./src/modules/clients/clients.module.ts":
/*!***********************************************!*\
  !*** ./src/modules/clients/clients.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const clients_service_1 = __webpack_require__(/*! ./clients.service */ "./src/modules/clients/clients.service.ts");
const clients_controller_1 = __webpack_require__(/*! ./clients.controller */ "./src/modules/clients/clients.controller.ts");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
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

/***/ "./src/modules/clients/clients.service.ts":
/*!************************************************!*\
  !*** ./src/modules/clients/clients.service.ts ***!
  \************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
let ClientsService = class ClientsService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = paginationDto;
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
            throw new common_1.NotFoundException('Client not found');
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
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new common_1.BadRequestException('Email already exists');
            }
            throw new common_1.BadRequestException('Failed to create client');
        }
    }
    async update(id, updateClientDto) {
        const client = await this.clientModel.findByPk(id);
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
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
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new common_1.BadRequestException('Email already exists');
            }
            throw new common_1.BadRequestException('Failed to update client');
        }
    }
    async remove(id) {
        const client = await this.clientModel.findByPk(id);
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        await client.destroy();
    }
    sanitizeColumn(column) {
        const allowedColumns = ['id', 'name', 'email', 'phone', 'created_at', 'updated_at'];
        return allowedColumns.includes(column) ? column : 'id';
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __metadata("design:paramtypes", [Object])
], ClientsService);


/***/ }),

/***/ "./src/modules/clients/dto/client.dto.ts":
/*!***********************************************!*\
  !*** ./src/modules/clients/dto/client.dto.ts ***!
  \***********************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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
        message: 'Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix'
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
        message: 'Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix'
    }),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "phone", void 0);


/***/ }),

/***/ "./src/modules/meetings/dto/meeting.dto.ts":
/*!*************************************************!*\
  !*** ./src/modules/meetings/dto/meeting.dto.ts ***!
  \*************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
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

/***/ "./src/modules/meetings/meetings.controller.ts":
/*!*****************************************************!*\
  !*** ./src/modules/meetings/meetings.controller.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const meetings_service_1 = __webpack_require__(/*! ./meetings.service */ "./src/modules/meetings/meetings.service.ts");
const meeting_dto_1 = __webpack_require__(/*! ./dto/meeting.dto */ "./src/modules/meetings/dto/meeting.dto.ts");
const pagination_dto_1 = __webpack_require__(/*! ../../common/dto/pagination.dto */ "./src/common/dto/pagination.dto.ts");
let MeetingsController = class MeetingsController {
    constructor(meetingsService) {
        this.meetingsService = meetingsService;
    }
    async findAll(paginationDto, client_id, seller_id, closed) {
        const query = {
            ...paginationDto,
            client_id: client_id ? parseInt(client_id) : undefined,
            seller_id: seller_id ? parseInt(seller_id) : undefined,
            closed: closed ? closed === 'true' : undefined
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
                    totalPages: Math.ceil(result.total / (paginationDto.limit || 10))
                }
            },
            message: 'Meetings retrieved successfully'
        };
        return response;
    }
    async findOne(id) {
        const meeting = await this.meetingsService.findOne(id);
        const response = {
            success: true,
            data: meeting,
            message: 'Meeting retrieved successfully'
        };
        return response;
    }
    async create(createMeetingDto) {
        const meeting = await this.meetingsService.create(createMeetingDto);
        const response = {
            success: true,
            data: meeting,
            message: 'Meeting created successfully'
        };
        return response;
    }
    async update(id, updateMeetingDto) {
        const meeting = await this.meetingsService.update(id, updateMeetingDto);
        const response = {
            success: true,
            data: meeting,
            message: 'Meeting updated successfully'
        };
        return response;
    }
    async remove(id) {
        await this.meetingsService.remove(id);
        const response = {
            success: true,
            message: 'Meeting deleted successfully'
        };
        return response;
    }
    async closeMeeting(id) {
        const meeting = await this.meetingsService.closeMeeting(id);
        const response = {
            success: true,
            data: meeting,
            message: 'Meeting closed successfully'
        };
        return response;
    }
};
exports.MeetingsController = MeetingsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('client_id')),
    __param(2, (0, common_1.Query)('seller_id')),
    __param(3, (0, common_1.Query)('closed')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object, String, String, String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MeetingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], MeetingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof meeting_dto_1.CreateMeetingDto !== "undefined" && meeting_dto_1.CreateMeetingDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MeetingsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof meeting_dto_1.UpdateMeetingDto !== "undefined" && meeting_dto_1.UpdateMeetingDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], MeetingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MeetingsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/close'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], MeetingsController.prototype, "closeMeeting", null);
exports.MeetingsController = MeetingsController = __decorate([
    (0, common_1.Controller)('meetings'),
    __metadata("design:paramtypes", [typeof (_a = typeof meetings_service_1.MeetingsService !== "undefined" && meetings_service_1.MeetingsService) === "function" ? _a : Object])
], MeetingsController);


/***/ }),

/***/ "./src/modules/meetings/meetings.module.ts":
/*!*************************************************!*\
  !*** ./src/modules/meetings/meetings.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetingsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const meetings_service_1 = __webpack_require__(/*! ./meetings.service */ "./src/modules/meetings/meetings.service.ts");
const meetings_controller_1 = __webpack_require__(/*! ./meetings.controller */ "./src/modules/meetings/meetings.controller.ts");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
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

/***/ "./src/modules/meetings/meetings.service.ts":
/*!**************************************************!*\
  !*** ./src/modules/meetings/meetings.service.ts ***!
  \**************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
let MeetingsService = class MeetingsService {
    constructor(meetingModel, clientModel, sellerModel) {
        this.meetingModel = meetingModel;
        this.clientModel = clientModel;
        this.sellerModel = sellerModel;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = 'meeting_at', sortOrder = 'DESC', client_id, seller_id, closed } = paginationDto;
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
                    as: 'client',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: this.sellerModel,
                    as: 'seller',
                    attributes: ['id', 'name', 'email', 'phone', 'active']
                }
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
                    as: 'client',
                    attributes: ['id', 'name', 'email', 'phone']
                },
                {
                    model: this.sellerModel,
                    as: 'seller',
                    attributes: ['id', 'name', 'email', 'phone', 'active']
                }
            ],
        });
        if (!meeting) {
            throw new common_1.NotFoundException('Meeting not found');
        }
        return meeting.toJSON();
    }
    async create(createMeetingDto) {
        const client = await this.clientModel.findByPk(createMeetingDto.client_id);
        if (!client) {
            throw new common_1.BadRequestException('Client not found');
        }
        const seller = await this.sellerModel.findByPk(createMeetingDto.seller_id);
        if (!seller) {
            throw new common_1.BadRequestException('Seller not found');
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
            throw new common_1.BadRequestException('Failed to create meeting');
        }
    }
    async update(id, updateMeetingDto) {
        const meeting = await this.meetingModel.findByPk(id);
        if (!meeting) {
            throw new common_1.NotFoundException('Meeting not found');
        }
        try {
            const updateData = {};
            if (updateMeetingDto.client_id !== undefined) {
                const client = await this.clientModel.findByPk(updateMeetingDto.client_id);
                if (!client) {
                    throw new common_1.BadRequestException('Client not found');
                }
                updateData.client_id = updateMeetingDto.client_id;
            }
            if (updateMeetingDto.seller_id !== undefined) {
                const seller = await this.sellerModel.findByPk(updateMeetingDto.seller_id);
                if (!seller) {
                    throw new common_1.BadRequestException('Seller not found');
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
            throw new common_1.BadRequestException('Failed to update meeting');
        }
    }
    async remove(id) {
        const meeting = await this.meetingModel.findByPk(id);
        if (!meeting) {
            throw new common_1.NotFoundException('Meeting not found');
        }
        await meeting.destroy();
    }
    async closeMeeting(id) {
        return this.update(id, { closed: true });
    }
    sanitizeColumn(column) {
        const allowedColumns = ['id', 'client_id', 'seller_id', 'meeting_at', 'closed', 'created_at', 'updated_at'];
        return allowedColumns.includes(column) ? column : 'meeting_at';
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

/***/ "./src/modules/seeds/seeds.controller.ts":
/*!***********************************************!*\
  !*** ./src/modules/seeds/seeds.controller.ts ***!
  \***********************************************/
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
exports.SeedsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const seeds_service_1 = __webpack_require__(/*! ./seeds.service */ "./src/modules/seeds/seeds.service.ts");
let SeedsController = class SeedsController {
    constructor(seedsService) {
        this.seedsService = seedsService;
    }
    async populateData() {
        await this.seedsService.populateClientsMeetings();
        return { message: 'Seeds executed successfully' };
    }
};
exports.SeedsController = SeedsController;
__decorate([
    (0, common_1.Post)('populate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedsController.prototype, "populateData", null);
exports.SeedsController = SeedsController = __decorate([
    (0, common_1.Controller)('seeds'),
    __metadata("design:paramtypes", [typeof (_a = typeof seeds_service_1.SeedsService !== "undefined" && seeds_service_1.SeedsService) === "function" ? _a : Object])
], SeedsController);


/***/ }),

/***/ "./src/modules/seeds/seeds.module.ts":
/*!*******************************************!*\
  !*** ./src/modules/seeds/seeds.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const database_module_1 = __webpack_require__(/*! ../../database/database.module */ "./src/database/database.module.ts");
const workers_module_1 = __webpack_require__(/*! ../workers/workers.module */ "./src/modules/workers/workers.module.ts");
const seeds_service_1 = __webpack_require__(/*! ./seeds.service */ "./src/modules/seeds/seeds.service.ts");
const seeds_controller_1 = __webpack_require__(/*! ./seeds.controller */ "./src/modules/seeds/seeds.controller.ts");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
let SeedsModule = class SeedsModule {
};
exports.SeedsModule = SeedsModule;
exports.SeedsModule = SeedsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            workers_module_1.WorkersModule,
            sequelize_1.SequelizeModule.forFeature([meeting_model_1.Meeting, client_model_1.Client, seller_model_1.Seller]),
        ],
        controllers: [seeds_controller_1.SeedsController],
        providers: [seeds_service_1.SeedsService],
        exports: [seeds_service_1.SeedsService],
    })
], SeedsModule);


/***/ }),

/***/ "./src/modules/seeds/seeds.service.ts":
/*!********************************************!*\
  !*** ./src/modules/seeds/seeds.service.ts ***!
  \********************************************/
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
exports.SeedsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
const client_model_1 = __webpack_require__(/*! ../../database/models/client.model */ "./src/database/models/client.model.ts");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
const workers_service_1 = __webpack_require__(/*! ../workers/workers.service */ "./src/modules/workers/workers.service.ts");
const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs */ "fs");
let SeedsService = class SeedsService {
    constructor(meetingModel, clientModel, sellerModel, workersService) {
        this.meetingModel = meetingModel;
        this.clientModel = clientModel;
        this.sellerModel = sellerModel;
        this.workersService = workersService;
    }
    async populateClientsMeetings() {
        console.log('🌱 Starting seed: clients-meetings data population');
        try {
            const possiblePaths = [
                path.join(__dirname, '../../database/seeds/clients-meetings.csv'),
                path.join(process.cwd(), 'src/database/seeds/clients-meetings.csv'),
                path.join(process.cwd(), 'api/src/database/seeds/clients-meetings.csv'),
                '/app/src/database/seeds/clients-meetings.csv'
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
            console.log(`📁 Reading CSV from: ${csvFilePath}`);
            const csvData = this.parseCSV(csvFilePath);
            console.log(`📊 Found ${csvData.length} rows in CSV`);
            const results = await this.processCSVData(csvData);
            console.log('✅ Data population completed successfully:');
            console.log(`- Clients: ${results.clients.inserted} inserted, ${results.clients.skipped} skipped`);
            console.log(`- Sellers: ${results.sellers.inserted} inserted`);
            console.log(`- Meetings: ${results.meetings.inserted} inserted, ${results.meetings.skipped} skipped`);
            console.log(`- Total CSV rows processed: ${results.total}`);
            if (results.meetings.inserted > 0) {
                console.log('🔄 Auto-queuing classifications for meetings...');
                await this.queueClassificationsForMeetings();
            }
        }
        catch (error) {
            console.error('❌ Seed failed:', error.message);
            if (error.message.includes('duplicate key') ||
                error.message.includes('already exists')) {
                console.log('⚠️  Data already exists, continuing...');
            }
            else {
                throw error;
            }
        }
    }
    async queueClassificationsForMeetings() {
        try {
            console.log('Queuing classifications for meetings...');
            const meetings = await this.meetingModel.findAll({
                order: [['id', 'ASC']]
            });
            console.log(`Found ${meetings.length} meetings to classify`);
            for (const meeting of meetings) {
                try {
                    console.log(`Classifying meeting ${meeting.id} for client ${meeting.client_id}...`);
                    await this.workersService.classifyMeeting(meeting.id);
                    console.log(`✅ Queued classification for meeting ${meeting.id}`);
                }
                catch (error) {
                    console.error(`❌ Error classifying meeting ${meeting.id}:`, error.message);
                }
            }
            console.log('✅ Classification queuing completed');
        }
        catch (error) {
            console.error('Error queuing classifications:', error);
            throw error;
        }
    }
    parseCSV(filePath) {
        const csvContent = fs.readFileSync(filePath, 'utf-8');
        const lines = csvContent.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            return row;
        });
    }
    async processCSVData(csvData) {
        const results = {
            clients: { inserted: 0, skipped: 0 },
            sellers: { inserted: 0 },
            meetings: { inserted: 0, skipped: 0 },
            total: csvData.length
        };
        const uniqueClients = new Map();
        const uniqueSellers = new Map();
        for (const row of csvData) {
            if (row['Correo Electronico'] && !uniqueClients.has(row['Correo Electronico'])) {
                try {
                    await this.clientModel.create({
                        name: row['Nombre'],
                        email: row['Correo Electronico'],
                        phone: row['Numero de Telefono']
                    });
                    uniqueClients.set(row['Correo Electronico'], true);
                    results.clients.inserted++;
                }
                catch (error) {
                    if (error.message && error.message.includes('duplicate key')) {
                        results.clients.skipped++;
                    }
                    else {
                        throw error;
                    }
                }
            }
            if (row['Vendedor asignado'] && !uniqueSellers.has(row['Vendedor asignado'])) {
                try {
                    await this.sellerModel.create({
                        name: row['Vendedor asignado'],
                        email: `${row['Vendedor asignado'].toLowerCase().replace(' ', '.')}@vambe.com`,
                        phone: '56912345678',
                        active: true
                    });
                    uniqueSellers.set(row['Vendedor asignado'], true);
                    results.sellers.inserted++;
                }
                catch (error) {
                    if (error.message && error.message.includes('duplicate key')) {
                    }
                    else {
                        throw error;
                    }
                }
            }
        }
        for (const row of csvData) {
            try {
                const client = await this.clientModel.findOne({ where: { email: row['Correo Electronico'] } });
                const seller = await this.sellerModel.findOne({ where: { name: row['Vendedor asignado'] } });
                if (client && seller) {
                    await this.meetingModel.create({
                        client_id: client.id,
                        seller_id: seller.id,
                        meeting_at: new Date(row['Fecha de la Reunion']),
                        closed: row['closed'] === '1',
                        transcript: row['Transcripcion']
                    });
                    results.meetings.inserted++;
                }
            }
            catch (error) {
                if (error.message && error.message.includes('duplicate key')) {
                    results.meetings.skipped++;
                }
                else {
                    throw error;
                }
            }
        }
        return results;
    }
};
exports.SeedsService = SeedsService;
exports.SeedsService = SeedsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(meeting_model_1.Meeting)),
    __param(1, (0, sequelize_1.InjectModel)(client_model_1.Client)),
    __param(2, (0, sequelize_1.InjectModel)(seller_model_1.Seller)),
    __metadata("design:paramtypes", [Object, Object, Object, typeof (_a = typeof workers_service_1.WorkersService !== "undefined" && workers_service_1.WorkersService) === "function" ? _a : Object])
], SeedsService);


/***/ }),

/***/ "./src/modules/sellers/dto/seller.dto.ts":
/*!***********************************************!*\
  !*** ./src/modules/sellers/dto/seller.dto.ts ***!
  \***********************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateSellerDto {
    constructor() {
        this.active = true;
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
        message: 'Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix'
    }),
    __metadata("design:type", String)
], CreateSellerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSellerDto.prototype, "active", void 0);
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
        message: 'Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix'
    }),
    __metadata("design:type", String)
], UpdateSellerDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSellerDto.prototype, "active", void 0);


/***/ }),

/***/ "./src/modules/sellers/sellers.controller.ts":
/*!***************************************************!*\
  !*** ./src/modules/sellers/sellers.controller.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sellers_service_1 = __webpack_require__(/*! ./sellers.service */ "./src/modules/sellers/sellers.service.ts");
const seller_dto_1 = __webpack_require__(/*! ./dto/seller.dto */ "./src/modules/sellers/dto/seller.dto.ts");
const pagination_dto_1 = __webpack_require__(/*! ../../common/dto/pagination.dto */ "./src/common/dto/pagination.dto.ts");
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
                    totalPages: Math.ceil(result.total / (paginationDto.limit || 10))
                }
            },
            message: 'Sellers retrieved successfully'
        };
        return response;
    }
    async findOne(id) {
        const seller = await this.sellersService.findOne(id);
        const response = {
            success: true,
            data: seller,
            message: 'Seller retrieved successfully'
        };
        return response;
    }
    async create(createSellerDto) {
        const seller = await this.sellersService.create(createSellerDto);
        const response = {
            success: true,
            data: seller,
            message: 'Seller created successfully'
        };
        return response;
    }
    async update(id, updateSellerDto) {
        const seller = await this.sellersService.update(id, updateSellerDto);
        const response = {
            success: true,
            data: seller,
            message: 'Seller updated successfully'
        };
        return response;
    }
    async remove(id) {
        await this.sellersService.remove(id);
        const response = {
            success: true,
            message: 'Seller deleted successfully'
        };
        return response;
    }
    async getActiveSellers() {
        const sellers = await this.sellersService.getActiveSellers();
        const response = {
            success: true,
            data: sellers,
            message: 'Active sellers retrieved successfully'
        };
        return response;
    }
};
exports.SellersController = SellersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof pagination_dto_1.PaginationDto !== "undefined" && pagination_dto_1.PaginationDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], SellersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], SellersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof seller_dto_1.CreateSellerDto !== "undefined" && seller_dto_1.CreateSellerDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], SellersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_g = typeof seller_dto_1.UpdateSellerDto !== "undefined" && seller_dto_1.UpdateSellerDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], SellersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], SellersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], SellersController.prototype, "getActiveSellers", null);
exports.SellersController = SellersController = __decorate([
    (0, common_1.Controller)('sellers'),
    __metadata("design:paramtypes", [typeof (_a = typeof sellers_service_1.SellersService !== "undefined" && sellers_service_1.SellersService) === "function" ? _a : Object])
], SellersController);


/***/ }),

/***/ "./src/modules/sellers/sellers.module.ts":
/*!***********************************************!*\
  !*** ./src/modules/sellers/sellers.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SellersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const sellers_service_1 = __webpack_require__(/*! ./sellers.service */ "./src/modules/sellers/sellers.service.ts");
const sellers_controller_1 = __webpack_require__(/*! ./sellers.controller */ "./src/modules/sellers/sellers.controller.ts");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
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

/***/ "./src/modules/sellers/sellers.service.ts":
/*!************************************************!*\
  !*** ./src/modules/sellers/sellers.service.ts ***!
  \************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const seller_model_1 = __webpack_require__(/*! ../../database/models/seller.model */ "./src/database/models/seller.model.ts");
const meeting_model_1 = __webpack_require__(/*! ../../database/models/meeting.model */ "./src/database/models/meeting.model.ts");
let SellersService = class SellersService {
    constructor(sellerModel, meetingModel) {
        this.sellerModel = sellerModel;
        this.meetingModel = meetingModel;
    }
    async findAll(paginationDto) {
        const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = paginationDto;
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
            throw new common_1.NotFoundException('Seller not found');
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
            });
            return seller.toJSON();
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new common_1.BadRequestException('Email already exists');
            }
            throw new common_1.BadRequestException('Failed to create seller');
        }
    }
    async update(id, updateSellerDto) {
        const seller = await this.sellerModel.findByPk(id);
        if (!seller) {
            throw new common_1.NotFoundException('Seller not found');
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
            if (Object.keys(updateData).length === 0) {
                return seller.toJSON();
            }
            await seller.update(updateData);
            return seller.toJSON();
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new common_1.BadRequestException('Email already exists');
            }
            throw new common_1.BadRequestException('Failed to update seller');
        }
    }
    async remove(id) {
        const seller = await this.sellerModel.findByPk(id, {
            include: [{
                    model: this.meetingModel,
                    as: 'meetings'
                }]
        });
        if (!seller) {
            throw new common_1.NotFoundException('Seller not found');
        }
        const meetingCount = seller.meetings?.length || 0;
        if (meetingCount > 0) {
            throw new common_1.BadRequestException('Cannot delete seller with associated meetings');
        }
        await seller.destroy();
    }
    async getActiveSellers() {
        const sellers = await this.sellerModel.findAll({
            where: { active: true },
            order: [['name', 'ASC']],
            raw: true,
        });
        return sellers;
    }
    sanitizeColumn(column) {
        const allowedColumns = ['id', 'name', 'email', 'phone', 'active', 'created_at', 'updated_at'];
        return allowedColumns.includes(column) ? column : 'id';
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

/***/ "./src/modules/workers/workers.controller.ts":
/*!***************************************************!*\
  !*** ./src/modules/workers/workers.controller.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const workers_service_1 = __webpack_require__(/*! ./workers.service */ "./src/modules/workers/workers.service.ts");
let WorkersController = class WorkersController {
    constructor(workersService) {
        this.workersService = workersService;
    }
    async classifyMeeting(meetingId, body) {
        const result = await this.workersService.classifyMeeting(meetingId, body);
        const response = {
            success: true,
            message: 'Classification task queued successfully',
            data: {
                task_id: result.taskId,
                meeting_id: meetingId,
                status: 'queued'
            }
        };
        return response;
    }
    async classifyMeetingsBatch(body) {
        const { meeting_ids, force_reprocess } = body;
        if (!Array.isArray(meeting_ids) || meeting_ids.length === 0) {
            const response = {
                success: false,
                error: 'Invalid meeting_ids array provided'
            };
            return response;
        }
        const validIds = meeting_ids.filter(id => !isNaN(Number(id)));
        if (validIds.length !== meeting_ids.length) {
            const response = {
                success: false,
                error: 'All meeting IDs must be valid numbers'
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
                total_queued: result.queuedTasks.length
            }
        };
        return response;
    }
    async getTaskStatus(taskId) {
        const status = await this.workersService.getTaskStatus(taskId);
        const response = {
            success: true,
            message: 'Task status retrieved successfully',
            data: status
        };
        return response;
    }
    async getWorkerStats() {
        const stats = await this.workersService.getWorkerStats();
        const response = {
            success: true,
            message: 'Worker statistics retrieved successfully',
            data: stats
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
                timestamp: new Date().toISOString()
            }
        };
        return response;
    }
    async getClassificationResult(meetingId) {
        const result = await this.workersService.getClassificationResult(meetingId);
        if (!result) {
            const response = {
                success: false,
                message: 'Classification result not found for this meeting'
            };
            return response;
        }
        const response = {
            success: true,
            message: 'Classification result retrieved successfully',
            data: {
                meeting_id: meetingId,
                classification: result
            }
        };
        return response;
    }
    async getAllClassificationResults() {
        const results = await this.workersService.getAllClassificationResults();
        const response = {
            success: true,
            message: 'All classification results retrieved successfully',
            data: {
                results,
                total_count: results.length
            }
        };
        return response;
    }
    async deleteClassificationResult(meetingId) {
        const deleted = await this.workersService.deleteClassificationResult(meetingId);
        if (!deleted) {
            const response = {
                success: false,
                message: 'Classification result not found for this meeting'
            };
            return response;
        }
        const response = {
            success: true,
            message: 'Classification result deleted successfully',
            data: {
                meeting_id: meetingId,
                deleted: true
            }
        };
        return response;
    }
};
exports.WorkersController = WorkersController;
__decorate([
    (0, common_1.Post)('classify/:meetingId'),
    __param(0, (0, common_1.Param)('meetingId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], WorkersController.prototype, "classifyMeeting", null);
__decorate([
    (0, common_1.Post)('classify/batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], WorkersController.prototype, "classifyMeetingsBatch", null);
__decorate([
    (0, common_1.Get)('task/:taskId'),
    __param(0, (0, common_1.Param)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], WorkersController.prototype, "getTaskStatus", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], WorkersController.prototype, "getWorkerStats", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], WorkersController.prototype, "workerHealthCheck", null);
__decorate([
    (0, common_1.Get)('classification/:meetingId'),
    __param(0, (0, common_1.Param)('meetingId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], WorkersController.prototype, "getClassificationResult", null);
__decorate([
    (0, common_1.Get)('classifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], WorkersController.prototype, "getAllClassificationResults", null);
__decorate([
    (0, common_1.Delete)('classification/:meetingId'),
    __param(0, (0, common_1.Param)('meetingId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], WorkersController.prototype, "deleteClassificationResult", null);
exports.WorkersController = WorkersController = __decorate([
    (0, common_1.Controller)('workers'),
    __metadata("design:paramtypes", [typeof (_a = typeof workers_service_1.WorkersService !== "undefined" && workers_service_1.WorkersService) === "function" ? _a : Object])
], WorkersController);


/***/ }),

/***/ "./src/modules/workers/workers.module.ts":
/*!***********************************************!*\
  !*** ./src/modules/workers/workers.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const workers_service_1 = __webpack_require__(/*! ./workers.service */ "./src/modules/workers/workers.service.ts");
const workers_controller_1 = __webpack_require__(/*! ./workers.controller */ "./src/modules/workers/workers.controller.ts");
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

/***/ "./src/modules/workers/workers.service.ts":
/*!************************************************!*\
  !*** ./src/modules/workers/workers.service.ts ***!
  \************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ioredis_1 = __webpack_require__(/*! ioredis */ "ioredis");
const Celery = __webpack_require__(/*! celery-ts */ "celery-ts");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
let WorkersService = class WorkersService {
    constructor(configService) {
        this.configService = configService;
        try {
            const redisConfig = this.configService.get('redis');
            const workersConfig = this.configService.get('workers');
            const redisUrl = `redis://${redisConfig.host}:${redisConfig.port}/0`;
            this.redisUrl = redisUrl;
            this.redis = new ioredis_1.default(redisUrl, {
                maxRetriesPerRequest: 3,
                lazyConnect: true
            });
            this.celeryClient = Celery.createClient({
                brokerUrl: redisUrl,
                resultBackend: redisUrl.replace('/0', '/1'),
            });
            this.classifyTask = this.celeryClient.createTask('classify_meeting');
            console.log(`🔧 Workers configured with queue: ${workersConfig.queueName}`);
        }
        catch (error) {
            console.error('❌ Error initializing WorkersService:', error);
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
                kwargs: {}
            });
            console.log(`Queued classification task for meeting ${meetingId} with task ID: ${taskId}`);
            return { taskId };
        }
        catch (err) {
            console.error('Error queuing classification task:', err);
            throw new Error(`Failed to queue classification task: ${err.message}`);
        }
    }
    async classifyMeetingsBatch(meetingIds, forceReprocess = false) {
        try {
            const batchTaskId = `batch_classify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const queuedTasks = [];
            for (const meetingId of meetingIds) {
                const { taskId } = await this.classifyMeeting(meetingId, { force_reprocess: forceReprocess });
                queuedTasks.push(taskId);
            }
            console.log(`Queued batch classification for ${meetingIds.length} meetings`);
            return { taskId: batchTaskId, queuedTasks };
        }
        catch (error) {
            console.error('Error queuing batch classification:', error);
            throw new Error(`Failed to queue batch classification: ${error.message}`);
        }
    }
    async getTaskStatus(taskId) {
        try {
            const taskDataString = await this.redis.get(`celery-task-meta-${taskId}`);
            if (!taskDataString) {
                return {
                    task_id: taskId,
                    status: 'pending',
                    meta: { message: 'Task not found or still queued' }
                };
            }
            const taskData = JSON.parse(taskDataString);
            let result = null;
            if (taskData.result && taskData.result !== 'null') {
                try {
                    result = JSON.parse(taskData.result);
                }
                catch {
                    result = taskData.result;
                }
            }
            let normalizedStatus = taskData.status?.toLowerCase() || 'pending';
            if (normalizedStatus === 'success') {
                normalizedStatus = 'completed';
            }
            else if (normalizedStatus === 'failure') {
                normalizedStatus = 'failed';
            }
            else if (normalizedStatus === 'started' || normalizedStatus === 'progress') {
                normalizedStatus = 'processing';
            }
            return {
                task_id: taskId,
                status: normalizedStatus,
                result,
                meta: taskData.meta ? JSON.parse(taskData.meta) : null,
                error: taskData.traceback
            };
        }
        catch (error) {
            console.error('❌ Error getting task status:', error);
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
            console.error('Error getting classification result:', error);
            throw new Error(`Failed to get classification result: ${error.message}`);
        }
    }
    async getAllClassificationResults() {
        try {
            const resultKeys = await this.redis.keys('classification_result:*');
            const results = [];
            for (const key of resultKeys) {
                const result = await this.redis.get(key);
                if (result) {
                    const meetingId = key.replace('classification_result:', '');
                    results.push({
                        meeting_id: parseInt(meetingId),
                        classification: JSON.parse(result)
                    });
                }
            }
            return results;
        }
        catch (error) {
            console.error('Error getting all classification results:', error);
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
            console.error('Error deleting classification result:', error);
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
                    error: 'Redis not initialized',
                    timestamp: new Date().toISOString()
                };
            }
            await this.redis.ping();
            const taskKeys = await this.redis.keys('celery-task-meta-*');
            const statusCounts = { pending: 0, processing: 0, completed: 0, failed: 0 };
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
                            if (normalizedStatus === 'success') {
                                statusCounts.completed++;
                            }
                            else if (normalizedStatus === 'failure') {
                                statusCounts.failed++;
                            }
                            else if (normalizedStatus === 'started' || normalizedStatus === 'progress') {
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
                timestamp: new Date().toISOString()
            };
        }
        catch (error) {
            console.error('❌ Error getting worker stats:', error);
            return {
                queue_length: 0,
                total_tasks: 0,
                sampled_tasks: 0,
                task_counts: { pending: 0, processing: 0, completed: 0, failed: 0 },
                recent_tasks_24h: 0,
                redis_connected: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
    async getRecentTasks(hours = 24) {
        try {
            const cutoffTime = Date.now() - (hours * 60 * 60 * 1000);
            const taskKeys = await this.redis.keys('celery-task-meta-*');
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
                                    date_done: taskData.date_done
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
            console.error('❌ Error getting recent tasks:', error);
            return [];
        }
    }
    async healthCheck() {
        try {
            await this.redis.ping();
            const taskKeys = await this.redis.keys('celery-task-meta-*');
            const totalTasks = taskKeys.length;
            return {
                healthy: true,
                redis: true,
                message: `Worker system is healthy. Total tasks processed: ${totalTasks}`
            };
        }
        catch (error) {
            return {
                healthy: false,
                redis: false,
                message: `Worker system unhealthy: ${error.message}`
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

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/sequelize":
/*!************************************!*\
  !*** external "@nestjs/sequelize" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),

/***/ "celery-ts":
/*!****************************!*\
  !*** external "celery-ts" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("celery-ts");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "ioredis":
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "sequelize-typescript":
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const seeds_service_1 = __webpack_require__(/*! ./modules/seeds/seeds.service */ "./src/modules/seeds/seeds.service.ts");
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
    try {
        console.log('🌱 Running database seeds...');
        const seedsService = app.get(seeds_service_1.SeedsService);
        await seedsService.populateClientsMeetings();
        console.log('✅ Seeds completed successfully');
    }
    catch (error) {
        console.error('❌ Seeds failed:', error);
        console.log('⚠️  Continuing with API startup despite seed failure...');
    }
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