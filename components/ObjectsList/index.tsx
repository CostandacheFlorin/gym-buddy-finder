import Tooltip from "../Tooltip";

const ObjectsList = ({
  list,
  title,
  propertyToShow,
  propertyToHover,
}: {
  list: any[];
  title: string;

  propertyToShow: string;
  propertyToHover?: string;
}) => {
  return (
    <div className="my-4">
      <h3 className="font-bold text-lg mb-4">{title}</h3>

      <div className="flex gap-2 max-w-[550px] flex-wrap">
        {list.map((item, index) => {
          if (propertyToHover) {
            return (
              <Tooltip key={`${item} ${index}`} text={item[propertyToHover]}>
                <div className="p-2 text-green-500 border-gray-600 border-2 rounded">
                  {item[propertyToShow]}
                </div>
              </Tooltip>
            );
          }

          return (
            <div
              key={item}
              className="p-2 border-2 rounded text-green-500 border-gray-600"
            >
              {propertyToShow === "none" ? item : item[propertyToShow]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ObjectsList;
