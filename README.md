# 🙋‍♂️ 장애인 & 가족을 위한 기록 관리 서비스 Neul
![표지](https://github.com/user-attachments/assets/da5bd035-7759-4d7c-9223-14c81ce95aca)

## 프로젝트 소개

- 소개팅은 AI 및 GPS 기반으로 주변 반려동물 친구를 찾아주고,
  산책을 함께할 친구를 매칭해주는 반려동물 소개팅 웹 서비스입니다.
- 배포: http://52.79.135.142
<br/>

- '산책가까?' 는 반려동물 산책 메이트를 구하는 SNS형 애플리케이션입니다.
- '산책가까?' 프로젝트를 시작하게 된 이유는, 국내 반려동물 양육 가구가 1,500만을 돌파 하였지만 지역 내 반려동물을 위한 커뮤니티의 수가 적어 커뮤니티 진입 장벽이 높은 것을 확인할 수 있었습니다. 바쁜 현대사회에서 소중한 반려동물 소울 메이트를 쉽고 편하게 찾을 수 있는 커뮤니티가 필요해 보였습니다.
- '산책가까?' 의 주요 기능
아이디 검색을 통해 다른 사용자를 검색하고 팔로우할 수 있습니다.
산책 피드를 통해 반려동물의 소울 산책 메이트를 매칭할 수 있습니다.
Pet Story를 통해 반려동물의 일상을 공유할 수 있으며 팔로잉 사용자의 피드를 실시간으로 확인할 수 있습니다.

<br />

## :busts_in_silhouette: Developers

| FE. 권태연                          | FE. 이정민                                  | FE. 최승연                              | BE. 김예지                              |
| ----------------------------------- | ------------------------------------------- | --------------------------------------- | --------------------------------------- |
| [ounjuu](https://github.com/ounjuu) | [werther901](https://github.com/werther901) | [yujeen02](https://github.com/yujeen02) | [yujeen02](https://github.com/yujeen02) |

<br />

## 기술 스택

- **🛠️ Frontend**: Next.js, TypeScript, Redux-toolkit, React Query, styled-components
- **🛠️ Backend**: Nest.js, TypeORM, MySQL, JWT
- **🛠️ DevOps**: AWS EC2, Nginx, PM2
- **🛠️ Others**: OAuth (Kakao, Naver, Google), Formik, Yup, Figma, Notion

<br />

## 주요 기능

- GPS 기반 친구 찾기
- 실시간 채팅 및 팔로우 기능
- 소셜 로그인 및 좋아요 기능
- 게시물 및 댓글, 대댓글 작성 기능
- 반려동물 프로필 등록 및 조회
- 마이페이지 - 내 정보, 알림 확인 등

<br />

## 역할분담

#### 팀원 이름은 기여순이 아닌 가나다 순으로 정렬 하였습니다.

### 권태연
- 로그인 기능 구현
- 댓글기능
- 게시글 랜더링 , 수정 , 삭제 , 생성 기능

### 김예지
- GitHub Project 활용한 진행 상황 관리
- 회원 가입 기능 구현
- 프로필 수정 기능 구현

### 이정민
- GitHub Project 활용한 진행 상황 관리
- 회원 가입 기능 구현
- 프로필 수정 기능 구현

### 최승연
- GitHub Project 활용한 진행 상황 관리
- 회원 가입 기능 구현
- 프로필 수정 기능 구현


<br />
  
### 프로젝트 실행

```
npm install
npm run dev
```
<br />

## 기능구현

<table>
  <tr>
    <td align="center">
      <strong>메인 페이지</strong><br><br>
      <img src="https://github.com/user-attachments/assets/9ee8d7db-5647-4c46-92b0-14316b3d3949" alt="mainpage" width="250" height="250">
    </td>
    <td align="center">
      <strong>전체 게시물</strong><br><br>
      <img src="https://github.com/user-attachments/assets/c5e59416-c6ff-4fd0-89da-8b6b52652b44" alt="all-post" width="250" height="250">
    </td>
    <td align="center">
       <strong>상세 게시물</strong><br><br>
      <img src="https://github.com/user-attachments/assets/5ba43f33-d9b9-4332-a8fa-d55677fcdb21" alt="post" width="250" height="250">
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>채팅하기</strong><br><br>
      <img src="https://github.com/user-attachments/assets/e6d3f330-0ae4-47d8-83cd-d55063b688ca" alt="chat" width="250" height="250">
    </td>
    <td align="center">
      <strong>내 정보 보기</strong><br><br>
      <img src="https://github.com/user-attachments/assets/6288bde7-1dcf-485b-9c98-f0d051e8786e" alt="my-profile" width="250" height="250">
    </td>
     <td align="center">
      <strong>산책 메이트 & AI 매칭</strong><br><br>
       <img alt="ai-page" src="https://github.com/user-attachments/assets/8b08b489-aa37-4d95-b706-2578f7e162ec" width="250" height="250"/>
    </td>
  </tr>
   <tr>
    <td align="center">
      <strong>소셜 로그인</strong><br><br>
      <img src="https://github.com/user-attachments/assets/6fb5ec66-3a87-4909-a2a3-7988230765a6" alt="login" width="250" height="250">
    </td>
    <td align="center">
      <strong>결제하기</strong><br><br>
      <img src="https://github.com/user-attachments/assets/c4f46d4d-906a-4c81-b165-a230cb200dd6" alt="pay-page" width="250" height="250">
    </td>
     <td align="center">
      <strong>ADMIN</strong><br><br>
       <img alt="admin-page" src="https://github.com/user-attachments/assets/e39b6e99-70d3-4dcb-95d7-08ce80a132dc" width="250" height="250"/>
    </td>
  </tr>
</table>

<br />

## DB 설계도
<img width="700" alt="db" src="https://github.com/user-attachments/assets/7371cf38-a177-4b11-adcf-6030828e5a5a" />

<br />

## API 명세서(추가필요)
<img width="1066" alt="Image" src="https://github.com/user-attachments/assets/867d3d1f-a769-4e3d-b661-50a8356fcd8b" />

<br />

## 기능 정의서(추가필요)

<img width="700" alt="devs" src="https://github.com/user-attachments/assets/8484daff-5d18-45bd-a178-7a61a78d9116" />

<br />

## 반응형
<table>
  <tr>
    <td align="center">
      <strong>내 정보 페이지</strong><br><br>
      <img src="https://github.com/user-attachments/assets/0a20e780-7e39-409c-8cfe-3ca5064a79ca" alt="main-page" width="280" height="400">
    </td>
    <td align="center">
      <strong>게시물 상세보기</strong><br><br>
      <img src="https://github.com/user-attachments/assets/e4e35581-abc5-4665-9bc5-a9527a23c891" alt="all-post" width="270" height="400">
    </td>
    <td align="center">
       <strong>채팅하기</strong><br><br>
      <img src="https://github.com/user-attachments/assets/b9a92580-7204-48b8-ae39-f863ffcaefe7" width="280" height="400">
    </td>
  </tr>
</table>

<br />

👉 **도우미 레포지토리**: [neul_admin](https://github.com/Neul-project/Neul-manager) <br>
👉 **관리자 레포지토리**: [neul_admin](https://github.com/Neul-project/Neul-manager) <br>
👉 **백엔드 레포지토리**: [neul_back](https://github.com/Neul-project/Neul-back) <br><br> 

