import styled from "@emotion/styled";
import Overlay from "../components/Overlay";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGatcha } from "../stores/useGatch";
import { useCamera } from "../stores/useCamera";
import Button from "../components/BackButton";
import * as ShopsApi from "~/app/api/shops";
import * as UsersApi from "~/app/api/users";
import { User, useAuth } from "~/store/auth";

export default function Gatcha() {
  const nftRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [randomGatchaData, setRandomGatchaData] =
    useState<GatchaResponse | null>(null);
  const { setGatchaState } = useGatcha();
  const { ShopScreen } = useCamera();
  const { setUser } = useAuth();

  const fetchGatchData = useCallback(async () => {
    if (loading || randomGatchaData) {
      return;
    }
    setLoading(true);

    try {
      // mockGatcha().then(data => setRandomGatchaData(data)); // 돈 계속 빠져나가서 만든 테스트용 함수

      // TODO: 배포시에는 이걸 사용해주세용
      const gatchaData = await fetchGatcha();
      console.log("당신의 NFT ! : ", gatchaData);
      setRandomGatchaData(gatchaData);
      try {
        UsersApi.getUserInfo().then(res => setUser(res.data as User));
      } catch (e) {
        UsersApi.getUserInfo().then(res => setUser(res.data as User));
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClickBackButton = useCallback(() => {
    setGatchaState("GATCHA_PREV");
    ShopScreen();
  }, []);

  useEffect(() => {
    fetchGatchData();
  }, []);

  if (loading || !randomGatchaData) {
    return (
      <Overlay sens="LOW">
        <Container></Container>
      </Overlay>
    );
  }

  return (
    <Overlay sens="LOW">
      <Container>
        <Button onClick={handleClickBackButton} />
        <Wrapper>
          <CenterBox>
            <NftCard
              ref={nftRef}
              className={randomGatchaData ? "animated" : ""}
              style={{
                width: "30rem",
                height: "28rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  color: `${getColorToGrade(randomGatchaData.grade)}`,
                }}
              >
                {randomGatchaData.grade}
              </h2>
              <img
                src={randomGatchaData.imgUrl || ""}
                style={{
                  maxWidth: "300px",
                  maxHeight: "300px",
                }}
              />
              <p
                style={{
                  fontSize: "2rem",
                  color: "#b2adad",
                }}
                className="mt-2"
              >
                {randomGatchaData.name || ""}
              </p>
            </NftCard>
          </CenterBox>
        </Wrapper>
      </Container>
    </Overlay>
  );
}

const Container = styled.div`
  min-width: 800px;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterBox = styled.div`
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NftCard = styled.div`
  display: flex;
  flexdirection: column;
  alignitems: center;
  border: 1px solid #ccc;
  borderradius: 10px;
  padding: 20px;
  boxshadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: transform 1s ease-in-out; // 애니메이션 효과 적용
`;

type Grade = "LEGENDARY" | "RARE" | "COMMON";

type GatchaResponse = {
  name: string;
  grade: Grade;
  hasItemAlready: boolean;
  imgUrl: string;
};

const MOCK_DATA: GatchaResponse = {
  name: "zuhee",
  grade: "LEGENDARY",
  hasItemAlready: false,
  imgUrl:
    "https://a710choi.s3.ap-northeast-2.amazonaws.com/f150b925-5f5c-4fe3-9676-3b6c9e41b536.png",
};

const getColorToGrade = (grade: string) => {
  grade = grade.toLowerCase();
  if (grade === "legendary") {
    return "#ffc800";
  }

  if (grade === "rare") {
    return "#73e337";
  }

  if (grade === "common") {
    return "#b2adad";
  }

  return "white";
};

const mockGatcha = async (): Promise<GatchaResponse> => {
  console.log("두근두근 가챠 타임 (테스트용)");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
      console.log(MOCK_DATA);
    }, 1000);
  });
};

const fetchGatcha: () => Promise<GatchaResponse> = async () => {
  console.log("두근두근 가챠 타임 (확률 조작 없는 진짜!)");
  const response = await ShopsApi.postGatcha();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response.data as GatchaResponse);
    }, 200);
  });
};
