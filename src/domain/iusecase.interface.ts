export interface iUseCase<Input,Output>{
    run(input:Input): Promise<Output>
}