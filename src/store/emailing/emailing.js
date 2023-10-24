import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchEmail = createAsyncThunk('fetchEmail', async()=> {
    const response = await fetch('https://flipkart-email-mock.now.sh/');
    return response.json();
});

const Emailing = createSlice({
    name:"emailing",
    initialState : {
        isLoading:false,
        data:null,
        isError:false,
    },
    extraReducers : (builder) => {
        builder.addCase(fetchEmail.pending, (state,action)=>{
            state.isLoading=true;

        })
        builder.addCase(fetchEmail.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchEmail.rejected, (state,action)=>{
            console.log('error',action.payload);
            state.isError=true;
        })
    }
});

export default Emailing.reducer;
