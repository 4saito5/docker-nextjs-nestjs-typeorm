// import { Entity, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, Column, ValueTransformer, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

// アクセスログ
@Entity({
  name: 'access_logs',
  engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci',
 })
export class AccessLog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'id:自動採番' })
  readonly id: bigint;

  @Column({ name: 'log_code', nullable: true, type: 'varchar', length: 100, comment: 'ログコード:アクセス毎に採番される\nリクエストとレスポンスでレコードを分けるが、このコードで紐付けができる' })
  logCode: string | null;

  @Column({ name: 'region_code', nullable: false, type: 'varchar', length: 100, comment: '地域コード:regionのキー' })
  regionCode: string;

  @Column({ name: 'user_code', nullable: true, type: 'varchar', length: 100, comment: 'ユーザコード:usersのキー、admin_usersのキー' })
  userCode: string | null;

  @Column({ name: 'is_admin', default: '0', type: 'tinyint', precision: 1, unsigned: true, comment: '管理者フラグ:0：利用者、1：管理者' })
  isAdmin: boolean;

  @Column({ name: 'ip', nullable: true, type: 'varchar', length: 255, comment: 'IPアドレス' })
  ip: string;

  @Column({ name: 'uri', nullable: true, type: 'varchar', length: 3000, comment: 'URI' })
  uri: string;

  @Column({ name: 'method', nullable: true, type: 'varchar', length: 10, comment: 'メソッド' })
  method: string;

  @Column({ name: 'header', nullable: true, type: 'text', comment: 'ヘッダー' })
  header: string;

  @Column({ name: 'user_agent', nullable: true, type: 'varchar', length: 1000, comment: 'ユーザエージェント' })
  userAgent: string | null;

  @Column({ name: 'request', nullable: true, type: 'text', comment: 'リクエスト' })
  request: string;

  @Column({ name: 'status_code', nullable: true, type: 'int', comment: 'ステータス' })
  statusCode: number | null;

  @Column({ name: 'response', nullable: true, type: 'longtext', comment: 'レスポンス' })
  response: string | null;

  @Column({ name: 'is_active', default: '1', type: 'tinyint', precision: 1, unsigned: true, comment: 'フロント表示フラグ:０：非表示、１：表示' })
  isActive: boolean;

  @Column({ name: 'created_at', type: 'datetime', precision: 0, default: () => 'CURRENT_TIMESTAMP(0)', comment: '登録日時' })
  readonly createAt: Date;

  @Column({ name: 'created_user', nullable: true, type: 'varchar', length: 100, comment: '登録ユーザ' })
  createdUser: string | null;

  @Column({ name: 'created_channel', nullable: true, type: 'int', comment: '登録チャネル:1:フロントユーザ\n2：加盟店スタッフ\n10:管理画面ユーザ\n20:バッチ\n0:SE作業' })
  createdChannel: number | null;

  SampleEnum
  @Column({ name: 'update_at', type: 'datetime', precision: 0, default: () => 'CURRENT_TIMESTAMP(0)', onUpdate: 'CURRENT_TIMESTAMP(0)', comment: '更新日時' })
  readonly updateAt: Date;

  @Column({ name: 'updated_user', nullable: true, type: 'varchar', length: 100, comment: '更新ユーザ' })
  updatedUser: string | null;

  @Column({ name: 'updated_channel', nullable: true, type: 'int', comment: '更新チャネル:1:フロントユーザ\n2：加盟店スタッフ\n10:管理画面ユーザ\n20:バッチ\n0:SE作業' })
  updatedChannel: number | null;

  @Column({ name: 'deleted_at', type: 'datetime', precision: 0, default: null, comment: '削除日' })
  deletedAt: Date;
}
