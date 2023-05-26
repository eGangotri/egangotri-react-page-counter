export const OTHERS = "Other";

export const appendOthersItemToList = (list:string[]) => {
    list.push(OTHERS);
    return list;
}

export const centers = appendOthersItemToList(["Choose Center", "Delhi", "Haridwar", "Jammu", "Srinagar", "Varanasi"]);

export const libraryMenuOptions = [
    {
        name: centers[0],
        centers: [""],
    },
    {
        name: centers[1],
        centers: appendOthersItemToList(["CSU", "Sarai"]),
    },
    {
        name: centers[2],
        centers: appendOthersItemToList(["Gurukul-Kangri"]),
    },
    {
        name: centers[3],
        centers: appendOthersItemToList(["BVT-Lucknow"]),
    },
    {
        name: centers[4],
        centers: appendOthersItemToList(["SPS", "JKACADEMY"]),
    },
    {
        name: centers[5],
        centers: appendOthersItemToList([
            "Vasishth Tripathi",
            "Jangam",
            "Kamalakarji",
            "Mumukshu",
            "Ved Nidhi",
        ]),
    },
    {
        name: centers[6],
        centers: appendOthersItemToList([]),
    },
];