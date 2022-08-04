import {MigrationInterface, QueryRunner} from "typeorm";

export class init1640341848324 implements MigrationInterface {
    name = 'init1640341848324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`access_logs\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id:自動採番', \`log_code\` varchar(100) NULL COMMENT 'ログコード:アクセス毎に採番される
リクエストとレスポンスでレコードを分けるが、このコードで紐付けができる', \`region_code\` varchar(100) NOT NULL COMMENT '地域コード:regionのキー', \`user_code\` varchar(100) NULL COMMENT 'ユーザコード:usersのキー、admin_usersのキー', \`is_admin\` tinyint(1) UNSIGNED NOT NULL COMMENT '管理者フラグ:0：利用者、1：管理者' DEFAULT '0', \`ip\` varchar(255) NULL COMMENT 'IPアドレス', \`uri\` varchar(3000) NULL COMMENT 'URI', \`method\` varchar(10) NULL COMMENT 'メソッド', \`header\` text NULL COMMENT 'ヘッダー', \`user_agent\` varchar(1000) NULL COMMENT 'ユーザエージェント', \`request\` text NULL COMMENT 'リクエスト', \`status_code\` int NULL COMMENT 'ステータス', \`response\` longtext NULL COMMENT 'レスポンス', \`is_active\` tinyint(1) UNSIGNED NOT NULL COMMENT 'フロント表示フラグ:０：非表示、１：表示' DEFAULT '0', \`created_at\` datetime(0) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(0), \`created_user\` varchar(100) NULL COMMENT '登録ユーザ', \`created_channel\` int NULL COMMENT '登録チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`update_at\` datetime(0) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0), \`updated_user\` varchar(100) NULL COMMENT '更新ユーザ', \`updated_channel\` int NULL COMMENT '更新チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`deleted_at\` datetime(0) NULL COMMENT '削除日', PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`);
        await queryRunner.query(`CREATE TABLE \`admin_user_login_logs\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id:自動採番', \`admin_login_id\` varchar(100) NULL COMMENT 'ログインID:ログインIDとして入力した文字', \`ip\` varchar(255) NOT NULL COMMENT 'IPアドレス', \`user_agent\` varchar(500) NULL COMMENT 'ユーザエージェント', \`result\` float NOT NULL COMMENT '結果:０：正常、１：ログインエラー、２：ログインロック', \`admin_user_code\` varchar(100) NULL COMMENT '管理者コード:admin_usersのキー', \`message\` varchar(4000) NULL COMMENT 'メッセージ:エラー内容などの文言を保存する', \`login_at\` datetime(0) NULL COMMENT 'ログイン日時:ログイン実施日時を保存する', \`is_active\` tinyint(1) UNSIGNED NOT NULL COMMENT 'フロント表示フラグ:０：非表示、１：表示' DEFAULT '0', \`created_at\` datetime(0) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(0), \`created_user\` varchar(100) NULL COMMENT '登録ユーザ', \`created_channel\` int NULL COMMENT '登録チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`update_at\` datetime(0) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0), \`updated_user\` varchar(100) NULL COMMENT '更新ユーザ', \`updated_channel\` int NULL COMMENT '更新チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`deleted_at\` datetime(0) NULL COMMENT '削除日', PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`);
        await queryRunner.query(`CREATE TABLE \`admin_user_role_mappings\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id:自動採番', \`screen_id\` varchar(100) NOT NULL COMMENT '画面ID', \`screen_name\` varchar(100) NOT NULL COMMENT '画面名', \`role_condition\` varchar(1000) NOT NULL COMMENT 'ロール許可値', \`screen_url\` varchar(255) NOT NULL COMMENT '画面URL', \`menu_sort\` float NOT NULL COMMENT 'メニュー表示順:０に近いほど上に表示', \`is_show_menu\` tinyint(1) UNSIGNED NOT NULL COMMENT 'フロント表示フラグ:０：非表示、１：表示' DEFAULT '0', \`is_active\` tinyint(1) UNSIGNED NOT NULL COMMENT 'フロント表示フラグ:０：非表示、１：表示' DEFAULT '0', \`created_at\` datetime(0) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(0), \`created_user\` varchar(100) NULL COMMENT '登録ユーザ', \`created_channel\` int NULL COMMENT '登録チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`update_at\` datetime(0) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0), \`updated_user\` varchar(100) NULL COMMENT '更新ユーザ', \`updated_channel\` int NULL COMMENT '更新チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`deleted_at\` datetime(0) NULL COMMENT '削除日', PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`);
        await queryRunner.query(`CREATE TABLE \`admin_users\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id:自動採番', \`admin_user_code\` varchar(100) NOT NULL COMMENT '管理者コード:ユニークな乱数を採番', \`admin_login_id\` varchar(100) NOT NULL COMMENT 'ログインID:ユニークな乱数を採番', \`password\` varchar(1000) NOT NULL COMMENT 'パスワード:ハッシュ化したパスワード', \`role\` int NULL COMMENT '権限:10：スーパーユーザ
20：地域管理者（自治体など）
25：地域一般ユーザ
30：加盟店管理者
※当初は地域管理者が利用するとして考える' DEFAULT '20', \`region_code\` varchar(100) NOT NULL COMMENT '地域コード:regionのキー', \`admin_user_name\` varchar(100) NULL COMMENT '管理者名:管理者の名前', \`admin_email\` varchar(255) NULL COMMENT '連絡先メールアドレス:管理者の連絡先', \`admin_phone\` varchar(20) NULL COMMENT '連絡先電話番号:管理者の連絡先', \`is_active\` tinyint(1) UNSIGNED NOT NULL COMMENT 'フロント表示フラグ:０：非表示、１：表示' DEFAULT '0', \`created_at\` datetime(0) NOT NULL COMMENT '登録日時' DEFAULT CURRENT_TIMESTAMP(0), \`created_user\` varchar(100) NULL COMMENT '登録ユーザ', \`created_channel\` int NULL COMMENT '登録チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`update_at\` datetime(0) NOT NULL COMMENT '更新日時' DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0), \`updated_user\` varchar(100) NULL COMMENT '更新ユーザ', \`updated_channel\` int NULL COMMENT '更新チャネル:1:フロントユーザ
2：加盟店スタッフ
10:管理画面ユーザ
20:バッチ
0:SE作業', \`deleted_at\` datetime(0) NULL COMMENT '削除日', PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`admin_users\``);
        await queryRunner.query(`DROP TABLE \`admin_user_role_mappings\``);
        await queryRunner.query(`DROP TABLE \`admin_user_login_logs\``);
        await queryRunner.query(`DROP TABLE \`access_logs\``);
    }

}
