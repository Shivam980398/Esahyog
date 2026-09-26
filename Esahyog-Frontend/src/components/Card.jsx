import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  const goToDepartment = () => {
    if (props.route) navigate(props.route);
  };
  return (
    <div
      onClick={goToDepartment}
      className="cursor-pointer h-84 w-70 border border-white/20
    bg-white/5
    backdrop-blur-lg
    shadow-[0_18px_45px_rgba(15,23,42,0.18)] rounded-[30px] p-7 flex flex-col justify-between  hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1 hover:scale-[1.01]"
    >
      <div>
        <div className="flex items-start justify-between mb-7">
          <img
            src={props.departmentLogo}
            alt="department"
            className="h-11 w-10.5 rounded-full border  border-white/40
    bg-white/5
    backdrop-blur-lg
    shadow-[0_18px_45px_rgba(15,23,42,0.18)] p-0.75 object-cover"
          />

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-0.75 border border-[#dadada] px-1.5 py-0.75 text-[10px] rounded-[5px] bg-transparent text-[#8b8b8b] hover:bg-slate-100 hover:border-slate-400"
          >
            Save <Bookmark size={10} />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-[16px] font-medium">
            {props.company}{" "}
            <span className="text-[9px] font-normal text-[#aeaeae]">
              {props.officeTime}
            </span>
          </h3>

          <h2 className="text-[21px] font-medium mt-1 line-clamp-2">
            {props.title}
          </h2>

          <div className="flex gap-1.25 mt-2.5">
            <span className="text-[10px] bg-[#e4e4e4] px-2 py-1 rounded-[3px]">
              {props.statusTag1}
            </span>
            <span className="text-[10px] bg-[#e4e4e4] px-2 py-1 rounded-[3px]">
              {props.statusTag2}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#d7d7d7ce] pt-4">
        <div>
          <h3 className="text-[17px] font-medium mb-1">
            {props.pay || props.duration || ""}
          </h3>
          <p className="text-[10px] text-[#8b8b8b]">
            {props.location || "Mumbai, India"}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToDepartment();
          }}
          className="bg-[#121212] text-white px-4 py-1.75 rounded-[5px] text-[12px] font-semibold hover:bg-black"
        >
          About More
        </button>
      </div>
    </div>
  );
};

export default Card;
