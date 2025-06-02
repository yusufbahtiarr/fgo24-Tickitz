import Badge from "./Badge";

function BannerTicket() {
  return (
    <>
      <div className="relative w-full h-[806px]">
        <div className="w-full rounded-[48px] h-[520px] flex flex-row items-end justify-start text-left bg-[url(../src/assets/images/tickitz2.png)] p-10 rounded-[48px] bg-no-repeat bg-cover bg-center relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-full h-full bg-[linear-gradient(180deg,rgba(15,16,13,0)_0%,rgba(15,16,13,0.8)_65.1%)] z-10"></div>
          <div></div>
        </div>
        <div className="absolute top-[360px] left-[80px] flex flex-row h-fit bottom-0 z-20 gap-10">
          <div className="flex flex-row gap-10">
            <div className="flex max-h-[444px w-[292px]">
              <img
                src="src/assets/images/movies.png"
                className="max-h-[444px] w-[292px] rounded-2xl"
                alt="movie"
              />
            </div>
          </div>
          <div className="flex gap-14 flex-col justify-between">
            <div className="pr-120 flex flex-col gap-5 justify-start">
              <div className="title-section text-white"> JUMBO</div>
              <div className="text-white font-light text-[18px] text-justify ">
                <p>
                  Don (Prince Poetiray), a chubby boy often mocked with the
                  nickname "Jumbo," wants to get back at the kids who bully him.
                  However, a spirit named Meri (Quinn Salman) asks for Don's
                  help to be reunited with her family’s grave, which has been
                  vandalized.
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <Badge>Action</Badge>
                <Badge>Adventure</Badge>
              </div>
            </div>
            <div className="flex flex-row py-6 text-left gap-10 pr-40">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col min-w-[200px]">
                  <div className="font-light text-[18px]">Release Date</div>
                  <div className="font-semibold text-[20px]">
                    March 31, 2025
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-light text-[18px]">Duration</div>
                  <div className="font-semibold text-[20px]">
                    1 hours 42 minutes
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <div className="font-light text-[18px]">Directed By</div>
                  <div className="font-semibold text-[20px]">
                    Ryan Adriandhy
                  </div>
                </div>
                <div className="flex flex-col pr-40">
                  <div className="font-light text-[18px]">Cast</div>
                  <div className="font-semibold text-[20px]">
                    Prince Poetiray, Quinn Salman, Graciella Abigail, M. Yusuf
                    Ozkan, M. Adhiyat, Angga Yunanda
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerTicket;
