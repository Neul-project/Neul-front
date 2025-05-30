# 🙋‍♂️ 장애인 & 가족을 위한 기록 관리 서비스 Neul
![표지](https://github.com/user-attachments/assets/7496762e-5829-4a70-a1aa-40a6ca09c163)


## 프로젝트 소개

- 기록 관리 서비스 'Neul'은 장애인 보호자와 장애인 돌봄 기관 간의 원활한 연결 및 기록 관리 시스템을 구축하여 장애인 복지의 효율성과 신뢰성을 높이기 위해 기획된 **장애인 기록관리 통합 서비스**입니다.<br/>
- 배포: [Neul](http://3.38.125.252)
<br/>

- 'Neul' 프로젝트를 시작하게 된 이유는 장애인 보호자들이 도우미와의 소통과 피보호자의 상태 관리를 수기로 진행하거나 비체계적으로 관리하고 있다는 문제를 발견했기 때문입니다. 이로 인해 돌봄 서비스의 신뢰성과 효율성이 낮아지는 상황이 자주 발생하였고 이를 디지털화된 시스템으로 개선할 필요가 있다고 판단했습니다.
<br />

- 주요 사용자<br />
**보호자**: 피보호자 등록, 도우미 신청, 상태 확인 및 활동 기록 열람, 담당 도우미와 채팅, 프로그램 신청<br />
**도우미**: 경력 입력, 신청 온 매칭 수락/거절, 피보호자 상태 기록 및 활동 기록, 담당 보호자와 채팅<br />
**총관리자**: 도우미 승인 관리, 전체 사용자 관리, 프로그램 등록, 광고 등록<br />
<br />
  
- 'Neul'의 주요 기능<br />
보호자는 피보호자 정보를 입력하여 회원가입을 할 수 있으며 **원하는 날짜를 선택해 도우미를 신청**할 수 있습니다.<br />
도우미는 본인의 경력을 입력 후 **총관리자의 승인**을 받아야 활동이 가능하며 **보호자의 신청**을 **수락 또는 거절**할 수 있습니다.<br />
도우미가 신청을 수락하면 **보호자는 결제를 통해 매칭을 확정**할 수 있고 매칭이 완료되면 해당 기간 동안 **도우미는 피보호자의 상태 및 활동을 기록**할 수 있습니다.<br />
보호자는 도우미가 작성한 기록을 **언제든 열람**할 수 있으며 **매칭된 보호자-도우미 간에는 실시간 1:1 채팅**이 가능합니다.<br />
보호자가 신청한 매칭일이 경과하면 해당 매칭은 **자동으로 종료**됩니다. <br />
매칭 여부와 관계없이 신청할 수 있는 다양한 **프로그램**도 함께 제공합니다.<br />

<br />

## :busts_in_silhouette: Developers

| FE. 권태연                          | FE. 이정민                                  | FE. 최승연                              | BE. 김예지                              |
| ----------------------------------- | ------------------------------------------- | --------------------------------------- | --------------------------------------- |
| [Taetea1](https://github.com/Taetea1) | [ihoek](https://github.com/ihoek) | [werther901](https://github.com/werther901) | [Yzoraa](https://github.com/Yzoraa) |

<br />

## 기술 스택

- **🛠️ Frontend**: Next.js, TypeScript, Zustand, Socket.io-client, styled-components
- **🛠️ Backend**: Nest.js, TypeORM, MySQL, JWT, Socket.io
- **🛠️ DevOps**: AWS EC2, Nginx, PM2
- **🛠️ Others**: OAuth (Kakao, Naver), Formik, Yup, Notion

<br />

## 주요 기능

- 로그인 및 회원가입 기능
- 도우미 신청 기능
- 도우미 신청 후 상태확인/활동기록 열람, 피드백 기능
- 실시간 채팅 기능
- 프로그램 신청/환불 기능
- 도우미 일정 관리 기능
- 시스템 관리자 대시보드 및 회원관리 기능

<br />

## 역할분담

#### 팀원 이름은 기여순이 아닌 가나다 순으로 정렬 하였습니다.

// 대충 작성해봤는데 맞는지 확인하고 수정하기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

### 권태연
- 도우미 일정표
- 상태 관리 및 확인 기능 구현
- 매칭된 회원 관리 및 보호자 매칭 신청 처리
- 도우미 정산 목록
- 알림 기능 구현
- 도우미 마이페이지 일부 개발
- 도우미/보호자간 실시간 채팅 기능 개발: 소켓을 활용한 1:1 채팅 및 안 읽은 채팅 개수 표시
- 채팅방 및 채팅창 무한 스크롤 구현
- 404 페이지 및 서버 헬스 체크
- 도우미 페이지 최적화 및 배포

### 김예지
- Nodemailer를 활용한 이메일 인증 시스템 구현
- 회원가입 및 로그인 API 구현 (로컬 및 소셜 로그인 연동 포함)
- 도우미/보호자 역할에 따른 권한 분리 및 인증 처리
- Gateway를 이용한 소켓 서버 구축 및 실시간 양방향 통신 처리
- 상태 기록 및 알림 데이터 처리 로직 구현
- 프로그램 신청, 장바구니, 결제 등 전체 비즈니스 로직 처리
- 관리자 페이지 및 통계 API 지원 (회원, 피드백, 정산, 광고 등)
- MySQL 기반 데이터베이스 설계 및 TypeORM을 활용한 Entity 기반 ORM 구현
- 전반적인 서버 아키텍처 및 API 명세 설계
- 백엔드 배포

### 이정민
- 대시보드 및 메인페이지, 푸터 UI 개발
- 도우미 및 보호자 회원 관리 기능 구현
- 피드백 확인 및 기록 기능 구현
- 활동 관리 및 확인 기능 구현
- 활동 관리 및 활동 기록
- 프로그램 등록 및 상세 확인 기능 구현
- 도우미 마이페이지
- 광고 관리
- 총관리자 페이지 최적화 및 배포

### 최승연
- 회원 가입 및 로컬/소셜 로그인(카카오, 네이버) 기능 구현
- 아이디/비밀번호 찾기 및 소셜 로그인 시 추가 정보 입력 기능 구현
- Zustand 상태 관리
- 헤더 및 메인페이지 일부 개발
- 프로그램 장바구니 기능
- 토스페이먼츠를 이용한 프로그램 결제 및 환불 처리 구현
- 프로그램 결제 및 환불 내역 확인 기능 구현
- 도우미 신청 기능 개발
- 수락된 매칭에 대한 결제 처리 기능 구현
- 보호자 마이페이지 개발: 내 정보/피보호자 정보 관리, 신청 내역 확인 기능 포함
- 도우미 마이페이지 개발: 내 정보, 도우미 가입승인 내역 기능 포함
- 보호자 페이지 최적화 및 배포


<br />

## 기능구현
<table>
  <th>상태기록</th>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/dd97ab61-3125-4824-8ace-09c35ebd1019" alt="status" width=100%>
    </td>
  </tr>
</table>

| 도우미 | 보호자 |
|--------|--------|
| <ul><li>담당하고 있는 피보호자의 하루 상태 등록</li><li>등록된 상태 수정</li><li>등록된 상태 삭제</li></ul> | <ul><li>날짜를 선택하여 피보호자의 하루 상태 확인</li></ul> |

<br />
<table>
  <th>활동기록</th>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c3b90911-12e1-4c4c-824e-29f42183a5af" alt="active" width=100%>
    </td>
  </tr>
</table>

| 도우미 | 보호자 |
|--------|--------|
| <ul><li>담당하고 있는 피보호자의 활동 등록</li><li>등록된 활동 수정</li><li>등록된 활동 삭제</li></ul> | <ul><li>개수 제한 없음</li><li>피보호자의 활동 확인</li></ul> |

<br />
<table>
  <th>피드백</th>
   <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/0d45503a-589b-428a-b570-9277bc7cdf86" alt="feed" width=100%>
    </td>
  </tr>
</table>

| 도우미 | 보호자 |
|--------|--------|
| <ul><li>보호자가 작성한 피드백 확인</li><li>활동기록명으로 검색 가능</li></ul> | <ul><li>해당 활동에 피드백 가능</li></ul> |

<br />
<table>
  <th>채팅</th>
   <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/d4568af9-14a9-4eb8-b348-dc11a3f3a71b" alt="chat" width=100%><br />
      <img src="https://github.com/user-attachments/assets/3209ae0f-1a47-461a-8550-c2d0f6500bec" alt="realtime" width=100%><br />
      <img src="https://github.com/user-attachments/assets/3dfc4377-5c0f-4ecf-ab0d-5c27cc99f4c6" alt="content" width=100%><br />
      <img src="https://github.com/user-attachments/assets/7b35c72f-5cf8-4f4b-b0d7-20d91874d6f6" alt="infinite" width=100%><br />
      <img src="https://github.com/user-attachments/assets/9b6b485f-a87c-4e42-8a72-587f98b07d93" alt="room" width=100%><br />
    </td>
  </tr>
</table>

| 도우미 | 보호자 |
|--------|--------|
| <ul><li>매칭된 보호자들의 채팅방 생성</li><li>각 채팅방의 안 읽은 채팅 개수 확인 가능</li><li>선택한 보호자와의 실시간 채팅 가능</li><li>매칭 종료시 해당 채팅방의 채팅 비활성화 및 채팅방 나가기 가능</li></ul>| <ul><li>소켓 이벤트로 메인에서 안 읽은 전체 채팅 개수 확인 가능</li><li>메인 이동 가능</li><li>선택한 도우미와의 실시간 채팅 가능</li><li>해당 채팅방의 내용 전체 삭제</li><li>채팅방 선택으로 이동</li><li>매칭된 도우미들의 채팅방 생성</li><li>채팅방, 채팅창 무한스크롤</li><li>매칭 종료시 해당 채팅방의 채팅 비활성화 및 채팅방 나가기 가능</li></ul> |

<br />
<br />

## DB 설계도
<img width="700" alt="db" src="https://github.com/user-attachments/assets/549bb36f-8a32-41f4-9468-a3d93c263909" />

<br />

## API 명세서
<img width="600" alt="Image" src="https://github.com/user-attachments/assets/174fb9bc-dc48-4600-96d9-9763caec3348" />


<br />

## 기능 정의서

<img width="600" alt="devs" src="https://github.com/user-attachments/assets/76c34910-0f28-4280-ad6e-6d081a67351f" />

<br />

## 반응형
<table>
  <tr>
    <td align="center">
      <strong>상태&활동기록</strong><br><br>
      <img src="https://github.com/user-attachments/assets/16b509ce-b2c0-4f4c-b84a-39093f59da1d" alt="status-check" width=100%>
    </td>
    <td align="center">
      <strong>상태&활동기록</strong><br><br>
      <img src="https://github.com/user-attachments/assets/16b509ce-b2c0-4f4c-b84a-39093f59da1d" alt="status-check" width=100%>
    </td>
    <td align="center">
      <strong>상태&활동기록</strong><br><br>
      <img src="https://github.com/user-attachments/assets/16b509ce-b2c0-4f4c-b84a-39093f59da1d" alt="status-check" width=100%>
    </td>
  </tr>
</table>

<br />

👉 **도우미 레포지토리**: [neul_admin](https://github.com/Neul-project/Neul-admin) <br>
👉 **관리자 레포지토리**: [neul_manager](https://github.com/Neul-project/Neul-manager) <br>
👉 **백엔드 레포지토리**: [neul_back](https://github.com/Neul-project/Neul-back) <br><br> 

