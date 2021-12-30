
                                                // arr1=[1,2,3,4], arr2[1,3]  Differance =[2,4]
const FindDifferanceInBothArrs =(arr1,arr2)=>{ //arr1 is main array that has more items or equal than arr 2, arr2 is 2nd arr that has missing items
    let DifferanceItems=[]
    let counter=0
    for(let i=0;i<arr1.length; i++)
      {
        for (let j=0;j<arr2.length; j++)
        {
          if(arr1[i].toString()===arr2[j].toString() )      
            {//console.log('BREAKKK found ' + CurrentTeachersCoursesIDs[i]+ ' in '+ReceivedcoursesIDsArr[j])
              break;
            }
          else if(j===arr2.length-1)  
          {
              DifferanceItems[counter]=arr1[i]
              //console.log(CurrentTeachersCoursesIDs[i] + ' is one of the ids to be removed at j=' +j)
              counter++;
          }
        }
      }
  return DifferanceItems
}

module.exports=FindDifferanceInBothArrs