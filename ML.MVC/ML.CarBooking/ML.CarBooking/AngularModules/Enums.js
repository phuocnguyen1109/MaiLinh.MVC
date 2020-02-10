var E = {
    RelationShipType: [
        { Id: 1, Name: 'Bố' },
        { Id: 2, Name: 'Mẹ' },
        { Id: 3, Name: 'Con Cái' },
        { Id: 4, Name: 'Bố Vợ' },
        { Id: 5, Name: 'Mẹ Vợ' },
        { Id: 6, Name: 'Bố Chồng' },
        { Id: 7, Name: 'Mẹ Chồng' }
    ],

    WorkLincenses: [
        { Id: 1, Name: 'An Toàn Vệ Sinh Lao Động' },
        { Id: 2, Name: 'Sơ Cấp Cứu' },
        { Id: 3, Name: 'Giấy Chứng Nhận Tập Huấn Nghiệp Vụ' },
        { Id: 4, Name: 'Giấy Chứng Nhận Nhân Viên Phục Vụ Hành Khách' },
        { Id: 5, Name: 'Giấy Chứng Nhận Lái Xe Phòng Thủ' },
        { Id: 6, Name: 'Giấy Xác Nhận Huấn Luyện An Toàn Nội Bộ' }
    ],

    DriveLicenses: [
        { Id: 1, Name: 'Dấu B2' },
        { Id: 2, Name: 'Dấu C' },
        { Id: 3, Name: 'Dấu D' },
        { Id: 4, Name: 'Dấu E' }
    ],

    EducationGrades: [
        { Id: 1, Name: 'Lớp 1' },
        { Id: 2, Name: 'Lớp 2' },
        { Id: 3, Name: 'Lớp 3' },
        { Id: 4, Name: 'Lớp 4' },
        { Id: 5, Name: 'Lớp 5' },
        { Id: 6, Name: 'Lớp 6' },
        { Id: 7, Name: 'Lớp 7' },
        { Id: 8, Name: 'Lớp 8' },
        { Id: 9, Name: 'Lớp 9' },
        { Id: 10, Name: 'Lớp 10' },
        { Id: 11, Name: 'Lớp 11' },
        { Id: 12, Name: 'Lớp 12' },
        { Id: 13, Name: 'Trung Cấp' },
        { Id: 14, Name: 'Cao Đẳng' },
        { Id: 15, Name: 'Đại Học' },
        { Id: 16, Name: 'Thạc Sĩ' },
        { Id: 17, Name: 'Tiến Sĩ' }

    ],

    Equipments: [
        { Id: 1, Name: "DÙ" },
        { Id: 2, Name: "TÚI XÁCH" },
        { Id: 3, Name: "BÌA TRÌNH KÝ" },
        { Id: 4, Name: "SIM ĐIỆN THOẠI" },
    ],

    HealthCheckStandard: [
        { Id: 1, Name: 'Thông Tư 14' },
        { Id: 2, Name: 'Thông Tư 24' },
        { Id: 3, Name: 'Khác' }
    ],

    Banks: [
        { Id: 1, Name: 'Vietcombank' },
        { Id: 2, Name: 'Aribank' },
        { Id: 3, Name: 'Techcombank' },
        { Id: 4, Name: 'Shinhan Bank' }
    ],
    JoinLevel: [
        { Id: 1, Name: '3000 Dưới 5 Năm' },
        { Id: 2, Name: '3500 Từ 5 Năm' },
        { Id: 3, Name: '4000 Từ 10 Năm' }
    ],

    Departments: [
        { id: 0, name: '-- Chọn Bộ Phận --' },
        { id: -1, name: 'Administrator' },
        { id: 1, name: 'Nhân Sự' },
        { id: 2, name: 'Kế Toán' },
        { id: 3, name: 'Kỹ Thuật - An Toàn' },
        { id: 4, name: 'Điều Hành' },
        { id: 5, name: 'Đội Xe' }
    ],

    Roles: [
        { id: 0, name: '-- Chọn Chức Vụ --' },
        { id: 2, name: 'Trưởng Phòng' },
        { id: 1, name: 'Phó Phòng' },
        { id: 3, name: 'Thư Ký' },
        { id: 4, name: 'Nhân Viên' },
        { id: 5, name: 'Lái Xe' },
        { id: 6, name: 'Phụ Xe' },
    ]
};
var VH = {
    DANGKY_NH: [{ id: 1, name: 'BẢN CHÍNH' },
    { id: 2, name: 'SAO Y NGÂN HÀNG' }],
    TRANGTHIETBI:
        [{ id: 1, name: 'TÚI Y TẾ' },
        { id: 2, name: 'DANH SÁCH THUỐC/DỤNG CỤ Y TẾ' },
        { id: 3, name: 'ÁO PHẢN QUANG' },
        { id: 4, name: 'TAM GIÁC CẢNH BÁO' },
        { id: 5, name: 'BÚA THOÁT HIỂM' },
        { id: 6, name: 'ĐÈN PIN CHIẾU SÁNG' },
        { id: 7, name: 'LƯỚI TRÙM' },
        { id: 8, name: 'BÌNH CHỮA CHÁY' },
        ],
    YEUCAU_TTB: [{ id: 1, name: 'NN' }, { id: 2, name: 'KH' }, { id: 3, name: 'CTY' }],

    BAIXE: [
        { id: 1, name: 'Bãi Xe 001' },
        { id: 2, name: 'Bãi Xe 002' },
        { id: 3, name: 'Bãi Xe 003' },
        { id: 4, name: 'Bãi Xe 004' },
        { id: 5, name: 'Bãi Xe 005' }
    ],

    VUNGHOATDONG: [
        { id: 1, name: 'HCM' },
        { id: 2, name: 'HN' },
        { id: 3, name: 'BN' },
        { id: 4, name: 'LA' },
        { id: 5, name: 'DN' },
        { id: 6, name: 'VL' },
    ],

    CONGSUAT: [
        { id: 1, name: '1HP' },
        { id: 2, name: '2HP' },
        { id: 3, name: '3HP' },
        { id: 4, name: '4HP' },
        { id: 5, name: '5HP' },
    ]
};