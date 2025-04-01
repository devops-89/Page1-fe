function useRoundDomesticSSRMerge(flightDetails) {
 if(flightDetails){
  return [{...flightDetails[0][1]},{...flightDetails[1][1]}]
 }
 else{
    return [];
 }
}

export default useRoundDomesticSSRMerge;
